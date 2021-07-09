import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../Layouts/Spinner';
import CompanyItem from './CompanyItem';
import { getCompanies } from '../../Actions/profile';

const Companies = ({ getCompanies, profile: { profiles, isLoading } }) => {
	useEffect(() => {
		getCompanies();
	}, [getCompanies]);

	return (
		<Fragment>
			{isLoading ? (
				<Spinner />
			) : (
				<Fragment>
					<h1 className='large text-primary'>Companies</h1>
					<p className='lead'>
						<i className='fab fa-connectdevelop'></i> All the companies that
						have been providing jobs for us. Get to know them.
					</p>
					<div className='profiles'>
						{profiles.length > 0 ? (
							profiles.map((profile) => (
								<CompanyItem key={profile._id} profile={profile} />
							))
						) : (
							<h4>No Companies registered</h4>
						)}
					</div>
				</Fragment>
			)}
		</Fragment>
	);
};

Companies.propTypes = {
	getCompanies: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	profile: state.profile,
});

export default connect(mapStateToProps, { getCompanies })(Companies);
