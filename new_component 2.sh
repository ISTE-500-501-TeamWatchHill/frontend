#!/bin/bash

if [ $# -eq 1 ]; then

    mkdir "./src/components/$1"
    touch "./src/components/$1/$1.js"
    touch "./src/components/$1/$1.module.css"

    echo "import React from \"react\";
import styles from './$1.module.css';

export default function $1(props) { 
    return (
        <>
            { /* Content here */ }
        </>
    );
}
    " >> "./src/components/$1/$1.js"   
    exit 1 
else 
    echo "Proper usage: ./new_component.sh <component_name>"
    exit 1
fi

