const handleQuery = (req, res, next) => {
  const { company, Category, color, sortBy } = req.query;
  req.filter = {};

  if (company) {
    console.log("company recived in middleware",company);
    req.filter.company = company;
  }

  if (Category) {
    req.filter.Category = Category;
  }
  
  if (color) {
    req.filter.color = color;
  }
  if (sortBy === "low_to_high") {
    req.sort = { Current_price: 1 }; // Sort by price in ascending order
  } else if (sortBy === "high_to_low") {
    req.sort = { Current_price: -1 }; // Sort by price in descending order
  }

  next();
};

module.exports = handleQuery;
