import React from "react";
import ProductsInDb from "./ProductsInDb";
import UsersInDb from "./UsersInDb";
import ContentCard from "./ContentCard";
import ContentRowTop from "./ContentRowTop";
import Footer from "./Footer";
import LastProductInDb from "./LastProductInDb";
import TopNavBar from "./TopBar";
import CategoriesInDb from "./CategoriesInDb";

export default function ContentWrapper() {
  return (
    <div id="content-wrapper" className="d-flex flex-column">
      <div id="content" className="bg-hampi">
        <TopNavBar />

        <div className="container-fluid">
          <div className="dashboard-section">
            <ContentRowTop />
          </div>

          <div className="dashboard-section">
            <div className="row">
              <ContentCard title="List of products in Database">
                <ProductsInDb />
              </ContentCard>

              <LastProductInDb />
            </div>
          </div>

          <div className="dashboard-section">
            <div className="row">
              <ContentCard title="List of categories in Database">
                <CategoriesInDb />
              </ContentCard>

              <ContentCard title="List of users in Database">
                <UsersInDb />
              </ContentCard>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
