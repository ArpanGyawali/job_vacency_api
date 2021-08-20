const router = require('express').Router();
const path = require('path');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const mongoose = require('mongoose');
const { check, validationResult } = require('express-validator');
const { userAuth } = require('../Middlewares/userAuth');
const { checkRole } = require('../Middlewares/checkRole');
const {
	addJob,
	viewJobs,
	viewJobById,
	deleteById,
	applyJob,
	viewJobByUserId,
	viewAppliedJobs,
	countJobs,
	applyFile,
	deleteFile,
	findFileId,
} = require('../Utilities/authJobs');

const { DB } = require('../Config');

const validationJobArr = [
	check('location', 'Loaction is required').not().isEmpty(),
	check('title', 'Enter the job title').not().isEmpty(),
	check('catagory', 'Enter the job catagory').not().isEmpty(),
	check('level', 'Enter the job level').not().isEmpty(),
];

const validationApplyArr = [
	check('resume', 'Please provide a resume').not().isEmpty(),
];

// Create a job posting
router.post(
	'/post-job',
	userAuth,
	checkRole(['admin', 'recruiter']),
	validationJobArr,
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({
				message: errors.array(),
				success: false,
			});
		} else {
			await addJob(req, res);
		}
	}
);

router.get('/view-jobs', userAuth, async (req, res) => {
	await viewJobs(req, res);
});

router.get('/view-job/:jobId', userAuth, async (req, res) => {
	await viewJobById(req, res);
});

router.get('/view-jobs/:userId', userAuth, async (req, res) => {
	await viewJobByUserId(req, res);
});

router.delete(
	'/delete-job/:jobId',
	userAuth,
	checkRole(['admin', 'recruiter']),
	async (req, res) => {
		await deleteById(req, res);
	}
);

// Apply for job with some id
router.post(
	'/apply-job/:jobId',
	userAuth,
	checkRole(['seeker']),
	validationApplyArr,
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({
				message: errors.array(),
				success: false,
			});
		} else {
			await applyJob(req, res);
		}
	}
);

router.get('/applied-jobs/:userId', userAuth, async (req, res) => {
	await viewAppliedJobs(req, res);
});

router.delete(
	'/delete-job/:jobId',
	userAuth,
	checkRole(['admin', 'recruiter']),
	async (req, res) => {
		await deleteById(req, res);
	}
);

//Count Job by company
router.get('/jobs-count', userAuth, checkRole(['admin']), async (req, res) => {
	await countJobs(req, res);
});

// // View appliers on a job
// router.get(
// 	'/view-appliers/:jobId',
// 	userAuth,
// 	checkRole(['recruiter']),
// 	async (req, res) => {
// 		await viewAppliers(req, res);
// 	}
// );

const conn = mongoose.createConnection(DB, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
});

let gfs;
conn.once('open', () => {
	gfs = new mongoose.mongo.GridFSBucket(conn.db, {
		bucketName: 'uploads',
	});
});

//Create storage engine
const storage = new GridFsStorage({
	url: DB,
	options: { useUnifiedTopology: true },
	file: (req, file) => {
		return new Promise((resolve, reject) => {
			const filename =
				file.originalname + '_' + Date.now() + path.extname(file.originalname);
			const fileInfo = {
				filename: filename,
				bucketName: 'uploads',
			};
			resolve(fileInfo);
		});
	},
});

// set up our multer to use the gridfs storage defined above
const store = multer({
	storage,
	// limit the size to 20mb for any files coming in
	limits: { fileSize: 20000000 },
	// filer out invalid filetypes
	fileFilter: function (req, file, cb) {
		checkFileType(file, cb);
	},
});

function checkFileType(file, cb) {
	// https://youtu.be/9Qzmri1WaaE?t=1515
	// define a regex that includes the file types we accept
	const filetypes = /pdf/;
	//check the file extention
	const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
	// more importantly, check the mimetype
	const mimetype = filetypes.test(file.mimetype);
	// if both are good then continue
	if (mimetype && extname) return cb(null, true);
	// otherwise, return error message
	cb('filetype');
}

const uploadMiddleware = (req, res, next) => {
	const upload = store.single('file');
	upload(req, res, function (err) {
		if (err instanceof multer.MulterError) {
			return res.status(404).json({
				message: 'File too large',
				success: false,
			});
		} else if (err) {
			// check if our filetype error occurred
			if (err === 'filetype')
				return res.status(404).json({
					message: 'Pdf files only',
					success: false,
				});
			// An unknown error occurred when uploading.
			return res.sendStatus(500);
		}
		// all good, proceed
		next();
	});
};

router.post(
	'/apply/:jobId',
	userAuth,
	checkRole(['seeker']),
	uploadMiddleware,
	async (req, res) => {
		//res.json({ file: req.file.id });
		//res.redirect('/');
		await applyFile(req, res, req.file);
	}
);

//display single file
router.get('/files/:fileId', async ({ params: { fileId } }, res) => {
	if (!fileId || fileId === 'undefined')
		return res.status(404).json({
			message: 'No file id',
			success: false,
		});
	const _id = new mongoose.Types.ObjectId(fileId);
	const file = await gfs.find({ _id });
	if (!file || file.length === 0) {
		return res.status(404).json({
			message: 'No file uploaded',
			success: false,
		});
	} else {
		await gfs.openDownloadStream(_id).pipe(res);
	}
});

//Find File id
router.get('/file/:userId/:jobId', async (req, res) => {
	await findFileId(req, res);
});

router.delete('/file/:fileId/:jobId', async (req, res) => {
	await deleteFile(req, res, gfs);
});

module.exports = router;
