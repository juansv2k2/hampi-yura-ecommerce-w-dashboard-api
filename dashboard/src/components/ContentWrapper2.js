import React from "react";
import ProductsInDb from "./ProductsInDb";
import ContentCard from "./ContentCard";
import ContentRowTop from "./ContentRowTop";
import Footer from "./Footer";
import LastProductInDb from "./LastProductInDb";
import TopNavBar from "./TopBar";
import CategoriesInDb from "./CategoriesInDb";

const products = [
    {
        name: 1,
    },
    {
        name: 2,
    },
    {
        name: 3,
    },
];

export default function ContentWrapper2() {
    return (
        <div id="content-wrapper " className="d-flex flex-column">
            <ContentCard title="List of products in Database">
                {products.map((product) => {
                    return (
                        <div className="col-lg-12 mb-4">
                            <div className="card bg-dark text-white shadow">
                                <div className="card-body">{"este es el producto " +product.name}</div>
                            </div>
                        </div>
                    );
                })}
            </ContentCard>
        </div>
    );
}
