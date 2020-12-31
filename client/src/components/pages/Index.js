import React from 'react';
import LeftIndex from '../layout/LeftIndex';
import RightIndex from '../layout/RightIndex';
import Footer from '../layout/Footer';
import './Index.css'

export default function Index() {
    return (
        <div className="index">
            <div className="index-grid">
                <LeftIndex />
                <RightIndex />
            </div>
            <Footer />
        </div>
    )
}