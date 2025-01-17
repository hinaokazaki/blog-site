import React from 'react';
import classes from '../css/Details.module.css';

export default function Categories({categories}) {
  return (
    <div>
      {categories.map((item, index) => 
      <button key={index} type="button" className={classes.categoriesButton}>{item}</button>
      )}
    </div>
  );
}
  
