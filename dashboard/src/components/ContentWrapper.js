import React from "react";
import ProductsInDb from "./ProductsInDb";
import ContentCard from "./ContentCard";
import ContentRowTop from "./ContentRowTop";
import Footer from "./Footer";
import LastProductInDb from "./LastProductInDb";
import TopNavBar from "./TopBar";
import CategoriesInDb from "./CategoriesInDb";

export default function ContentWrapper() {
    return (
      <div id="content-wrapper " className="d-flex flex-column">
        <div id="content bg-hampi">
          <TopNavBar />

          <div className="container-fluid mt-5">
            

            <ContentRowTop />

            <div className="row">
              <ContentCard title="List of products in Database">
                <ProductsInDb />
              </ContentCard>

              <ContentCard title="List of categories in Database">
                <CategoriesInDb />
              </ContentCard>

              <LastProductInDb />
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
}
