import React from "react";
import PropTypes from "prop-types";

function SmallCard({ title, value, iconClass, cardClass }) {
  // Enhanced color mapping for natural theme
  const getIconColor = () => {
    if (cardClass.includes("primary")) return "text-primary";
    if (cardClass.includes("success")) return "text-success";
    if (cardClass.includes("info")) return "text-info";
    if (cardClass.includes("warning")) return "text-warning";
    if (cardClass.includes("danger")) return "text-danger";
    return "text-natural";
  };

  return (
    <div className="col-md-3 col-lg-3">
      <div className={`card ${cardClass} shadow-natural h-100`}>
        <div className="card-body">
          <div className="row no-gutters align-items-center">
            <div className="col mr-3">
              <div className="text-xs font-weight-bold text-uppercase mb-1 text-earth">
                {title}
              </div>
              <div className="h4 mb-0 font-weight-bold text-earth">
                {typeof value === "number" &&
                title.toLowerCase().includes("revenue")
                  ? `$${value.toLocaleString()}`
                  : value}
              </div>
            </div>
            <div className="col-auto">
              <div className="rounded-circle bg-hampi-natural p-2 shadow">
                <i
                  className={`${iconClass} fa-2x ${getIconColor()} stats-icon`}
                ></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* DEFINICIÓN DE PROPIEDADES POR DEFAULT */

SmallCard.defaultProps = {
  title: "No Title",
  color: "success",
  cuantity: "No cuatity",
  icon: "fa-clipboard-list",
};

/* PROPTYPES */

SmallCard.propTypes = {
  atritutes: PropTypes.shape({
    title: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    cuantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    icon: PropTypes.string.isRequired,
  }),
};

export default SmallCard;
