import React from "react";

const ContentCard = ({ title, children }) => {
  return (
    <div className="col-md-6 mb-4">
      <div className="card border-left-primary shadow h-100 py-2">
        <div className="card-body">
          <div className="row no-gutters align-items-center">
            <div className="col mr-2">
              <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                {title}
              </div>
              <div className="card-content">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentCard;
