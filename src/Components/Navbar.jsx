
import React from 'react'

const Navbar = ({keyword,setKeyword}) => {

    const handleSearchChange = (e) => {
        setKeyword(e.target.value);
      };
 

  

  return (
    <nav className='flex justify-between items-center w-full h-20 px-4 text-black bg-gray-400  '>
        <div>
            <h1 className='text-5xl text-bold ml-2'>POKEMON</h1>
        </div>       

        <input
                className="border border-gray-400 p-2 w-64 rounded-md"
                type="text"
                placeholder="Search..."
                value={keyword}
                onChange={handleSearchChange}
            />


    </nav>
  )
}

export default Navbar;