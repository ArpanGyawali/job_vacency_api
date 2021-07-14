import React, { useState } from 'react';
import PropTypes from 'prop-types';

const SearchBox = ({ searchField, onSearch }) => {
	// const handleKeyPress = (event) => {
	// 	if (event.key === 'Enter') {
	// 		getDataFromSearch(searchField);
	// 	}
	// };

	return (
		<div className='form-group'>
			<input
				type='search'
				placeholder='Search'
				value={searchField}
				onChange={(e) => onSearch(e.target.value)}
				// onKeyPress={props.onKeyPresshandleKeyPress}
			/>
		</div>
	);
};

SearchBox.propTypes = {
	getDataFromSearch: PropTypes.func.isRequired,
};

export default SearchBox;

// import React, { useState } from 'react';
// import SearchList from './SearchList';

// function Search({ details }) {

//   const [searchField, setSearchField] = useState("");

//   const filteredPersons = details.filter(
//     person => {
//       return (
//         person
//         .name
//         .toLowerCase()
//         .includes(searchField.toLowerCase()) ||
//         person
//         .email
//         .toLowerCase()
//         .includes(searchField.toLowerCase())
//       );
//     }
//   );

//   const handleChange = e => {
//     setSearchField(e.target.value);
//   };

//   function searchList() {
//     return (
//       <Scroll>
//         <SearchList filteredPersons={filteredPersons} />
//       </Scroll>
//     );
//   }

//   return (
//     <section className="garamond">
//       <div className="navy georgia ma0 grow">
//         <h2 className="f2">Search your course</h2>
//       </div>
//       <div className="pa2">
//         <input
//           className="pa3 bb br3 grow b--none bg-lightest-blue ma3"
//           type = "search"
//           placeholder = "Search People"
//           onChange = {handleChange}
//         />
//       </div>
//       {searchList()}
//     </section>
//   );
// }

// export default Search;
