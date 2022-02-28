 //Body Mass ındex -- kg/m2
 const calcBMI = (height, weight) => {
    return weight / Math.pow(height / 100, 2);
  };

  //Body Surface Area -- m2
  const calcBSA = (height, weight) => {
    return (
      0.20247 *
      Math.pow(height / 100, 0.725) *
      Math.pow(weight, 0.425)
    ).toFixed(2);
  };

  //Lean Body Weight --kg
  const calcLBWForMale = (height, weight) => {
    return Math.ceil(0.407 * weight + 0.267 * height - 19.2);
  };

  const calcLBWForFemale = (height, weight) => {
    return Math.ceil(0.252 * weight + 0.473 * height - 48.3);
  };

  //Ideal Body Weight --kg
  const calcIBWForMale = (height, weight) => {
    return Math.floor(50 + 0.91 * (height - 152.4));
  };

  const calcIBWForFemale = (height, weight) => {
    return Math.floor(45.5 + 0.91 * (height - 152.4));
  };