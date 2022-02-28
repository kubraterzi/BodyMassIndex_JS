class Calculator {
  constructor() {}

  setValues(height, weight) {
    this.height = height;
    this.weight = weight;
  }

  //Body Mass ındex -- kg/m2
  calcBMI = () => {
    return (this.weight / Math.pow(this.height / 100, 2)).toFixed(1);
  };

  //Body Surface Area -- m2
  calcBSA = () => {
    return (
      0.20247 *
      Math.pow(this.height / 100, 0.725) *
      Math.pow(this.weight, 0.425)
    ).toFixed(2);
  };

  //Lean Body Weight --kg
  calcLBWForMale = () => {
    return Math.ceil(0.407 * this.weight + 0.267 * this.height - 19.2);
  };

  calcLBWForFemale = () => {
    return Math.ceil(0.252 * this.weight + 0.473 * this.height - 48.3);
  };

  //Ideal Body Weight --kg
  calcIBWForMale = () => {
    return Math.floor(50 + 0.91 * (this.height - 152.4));
  };

  calcIBWForFemale = () => {
    return Math.floor(45.5 + 0.91 * (this.height - 152.4));
  };

  determineBMICategory = (bmiValue) => {
    if (bmiValue > 12 && bmiValue < 18.49) {
      return {
        status: "Under Weight",
        messageTitle: "underweight",
      };
    } else if (bmiValue > 18.5 && bmiValue < 24.9) {
      return {
        status: "Normal Weight",
        messageTitle: "normalweight",
      };
    } else if (bmiValue > 25 && bmiValue < 29.9) {
      return {
        status: "Over Weight",
        messageTitle: "overweight",
      };
    } else {
      return {
        status: "Obesity",
        messageTitle: "obesity",
      };
    }
  };
}

class Utilities {
  constructor() {}

  printResult = (id, calcResult) => {
    document.getElementById(id).innerText = calcResult;
  };

  printHealthStatus = (id, healthStatus) => {
    document.getElementById(id).innerText = healthStatus;
  };
}

const calculator = new Calculator();
const utilities = new Utilities();
const height = document.querySelector("#height");
const weight = document.querySelector("#weight");

const idsInfoLabels = [];
const infoLabels = document.querySelectorAll("[data-info-label]");

infoLabels.forEach((info) => {
  idsInfoLabels.push(info.getAttribute("id"));
});

const calcForAll = {
  BMI: calculator.calcBMI,
  BSA: calculator.calcBSA,
};

const calcForFemale = {
  IBW: calculator.calcIBWForFemale,
  LBW: calculator.calcLBWForFemale,
};

const calcForMale = {
  IBW: calculator.calcIBWForMale,
  LBW: calculator.calcLBWForMale,
};

const userNotificationMessages = {
  underweight:
    "You are below your ideal weight, but you can rise! All you need is a little motivation and a regular and balanced diet.",
  normalweight:
    "You are great! You are at your ideal weight! Now it's up to you to protect it. Continue to eat regularly and balanced without neglecting movement!",
  overweight:
    "You are close to the target! There is a short road ahead. With a balanced diet and regular physical activity, you can hit the ideal out of 12!",
  obesity:
    "You left your ideal weight a little far away, but we have good news; Reaching him is not as difficult as you think. Everything starts with being determined and motivated, never give up and keep your motivation high, even you will not believe the speed of change when movement and balanced nutrition are a part of your life. It will be easier than you hope by keeping motivation high, paying attention to a balanced and regular diet, and increasing movement.",
};

const calc = () => {
  document.getElementById("result-section").style.visibility = "visible";

  calculator.setValues(height.value, weight.value);
  let checkGender = document.getElementById("female").checked;

  idsInfoLabels.forEach((id) => {
    switch (id) {
      case "bmi-result":
        const healthStatus = calculator.determineBMICategory(calcForAll.BMI());
        utilities.printResult(id, calcForAll.BMI());
        utilities.printHealthStatus("bmi-result-title", healthStatus.status);
        utilities.printHealthStatus(
          "bmi-result-description",
          userNotificationMessages[healthStatus.messageTitle]
        );
        break;
      case "bsa-result":
        utilities.printResult(id, calcForAll.BSA());
        break;
      case "ibw-result":
        checkGender
          ? utilities.printResult(id, calcForFemale.IBW())
          : utilities.printResult(id, calcForMale.IBW());
        break;
      case "lbw-result":
        checkGender
          ? utilities.printResult(id, calcForFemale.LBW())
          : utilities.printResult(id, calcForMale.LBW());
        break;
    }
  });
};
