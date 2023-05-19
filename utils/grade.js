const calculateGrade = () => {
  switch (score) {
    case socre > 70:
      return "A";
    case socre > 65:
      return "B";
    case socre > 50:
      return "C";
    default:
      return "F";
  }
};

module.exports = {
  calculateGrade,
};
