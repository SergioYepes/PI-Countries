import React, {useState} from "react";
// import { useDispatch} from "react-redux";
import "./paginacion.css"
// import { nextHandler,prevHandler } from "../actions"; 

function Paginacion({countryPG,TotalPage,setValue,currentValue}){
    const [pageNumberLimit] = useState(5);
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

    const pages = []
    for (let i = 1; i < Math.ceil(countryPG.length / TotalPage); i++) {
        pages.push(i)
    }

    const handleClick = (e) => {
        setValue(Number(e.target.id))
        window.scrollTo(0, 0);
    }

    const handleNextbtn = () =>{
        setValue(currentValue + 1);

        if(currentValue + 1 >= maxPageNumberLimit){
            setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
        }
    }
    const handlePrevbtn = () =>{
        setValue(currentValue + - 1);

        if((currentValue - 1) % pageNumberLimit === 0){
            setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
        }
    }

    let pageIncrementBtn = null;
    if(pages.length > maxPageNumberLimit) {
        pageIncrementBtn = <li onClick={handleNextbtn}> &hellip; </li>
    }

    let pageDecrementBtn = null;
    if(minPageNumberLimit === 1) {
        pageDecrementBtn = <li onClick={handlePrevbtn}> &hellip; </li>
    }


    const renderPageNumbers = pages.map(number => {
        if(number < maxPageNumberLimit + 1 && number > minPageNumberLimit){
            return (
                <li key={number} id={number} onClick={e => handleClick(e)}
                className={currentValue === number ? 'active' : null}
                >
                    {number}
                </li>
            );
        } else {
            return null;
        }
    })


    return(
    <div>
        <ul className="pageNumbers">
            <li>
                <button
                disabled={currentValue === pages[0] ? true : false}
                onClick={handlePrevbtn}
                >
                    Anterior
                </button>
            </li>
            {pageDecrementBtn}
            {renderPageNumbers}
            {pageIncrementBtn}
            <li>
                <button
                onClick={handleNextbtn}
                disabled={currentValue === pages[pages.length - 1] ? true : false}>
                    Siguiente
                </button>
            </li>
        </ul>
    </div>
    )
}
export default Paginacion