import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../Layouts/Spinner';
import CompanyItem from './CompanyItem';
import { getCompanies } from '../../Actions/profile';

const Companies = ({ getCompanies, profile: { profiles, isLoading } }) => {
	const [allCompanies, setAllCompanies] = useState([]);
	const [filteredCompanies, setFilteredCompanies] = useState([]);
	const [searchField, setSearchField] = useState('');

	useEffect(() => {
		getCompanies();
		setAllCompanies(profiles);
	}, [getCompanies, profiles]);

	useEffect(() => {
		setFilteredCompanies(
			allCompanies.filter((company) =>
				company.user.name.toLowerCase().includes(searchField.toLowerCase())
			)
		);
	}, [searchField, allCompanies]);

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
					<div className='search-wrap'>
						<i className='fa fa-search'></i>
						<input
							className='search'
							type='search'
							placeholder='Search'
							onChange={(e) => setSearchField(e.target.value)}
							// onKeyPress={props.onKeyPresshandleKeyPress}
						/>
					</div>
					<br />
					<div className='profiles'>
						{filteredCompanies.length > 0 ? (
							filteredCompanies.map((profile) => (
								<CompanyItem key={profile._id} profile={profile} />
							))
						) : (
							<h4>No Companies found</h4>
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
