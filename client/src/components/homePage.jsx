import React, { useState,useEffect } from 'react';
import {  useSelector, } from 'react-redux';

import CountryCard from './countryCard'
import style from './homePage.module.css'

const countriesPerPage = 10
const visiblePageButtons = 5;

const HomePage = ()=>{

    const allcountries = useSelector(state=>state.country.allCountries)

    const [totalPages,setTotalPages] = useState(0)

    const [page,setPage] = useState(0)

    useEffect(()=>{
        setTotalPages(Math.ceil(allcountries.length/countriesPerPage))
        setPage(0)
    },[allcountries])

    if(allcountries.length === 0) return <h1 className={style.loading}>Loading Countries ...</h1>
    
    const renderPageButtons = () => {
        const startPage = Math.max(0, Math.min(page - Math.floor(visiblePageButtons / 2), totalPages - visiblePageButtons));
        const endPage = Math.min(startPage + visiblePageButtons, totalPages);
   
        return Array.from({ length: endPage - startPage }).map((_, i) => {
            const pageNumber = startPage + i;
            const buttonClass = pageNumber === page ? style.selectedPageButton : style.pageButton; // Aplica estilos diferentes a la página seleccionada
            return (
                <button className={buttonClass} key={pageNumber} onClick={() => setPage(pageNumber)}>{pageNumber + 1}</button>
            );
        });
    };

    return (
        <div>
            <div className={style.pagination}>
                {page > 0 && (
                    <button key={'<<'} className={style.pageButton} type="" onClick={() => setPage(0)}>{'<<'}</button>
                )}
                {renderPageButtons()}
                {page < totalPages - 1 && (
                    <button key={'>>'} className={style.pageButton} type="" onClick={() => setPage(totalPages - 1)}>{'>>'}</button>
                )}
            </div>

            <div className={style.container}>
                {
                    allcountries.slice(0 + (page * countriesPerPage), countriesPerPage + (page * countriesPerPage)).map(({id,name,continents,flags})=>{
                        return(
                            <>
                                <CountryCard
                                    id={id}
                                    key={id+' '+name}
                                    name={name}
                                    continents={continents}
                                    flags={flags}
                                />
                            </>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default HomePage