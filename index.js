// purpose: initializes menu items
function MenuItem(name, cost) {
  this.name = name;
  this.cost = cost;
}

menuItems = new Array(
  new MenuItem("Chicken Chop Suey", 4.5),
  new MenuItem("Sweet and Sour Pork", 6.25),
  new MenuItem("Shrimp Lo Mein", 5.25),
  new MenuItem("Moo Shi Chicken", 6.5),
  new MenuItem("Fried Rice", 2.35)
);

// purpose: update the prices
function updateTotals() {
  //update cost values
  var numItems;
  var subtotal = 0;
  for (i = 0; i < menuItems.length; i++) {
    numItems = document.getElementsByName("quan" + i)[0].value;
    if (parseInt(numItems) != 0) {
      itemCost = (parseInt(numItems) * menuItems[i].cost).toFixed(2);
      document.getElementsByName("cost")[i].value = itemCost;
      subtotal += parseFloat(itemCost);
    }
  }

  // get tax, subtotal, and total
  tax = subtotal * 0.0625;
  total = subtotal + tax;
  document.getElementById("subtotal").value = subtotal.toFixed(2);
  document.getElementById("tax").value = tax.toFixed(2);
  document.getElementById("total").value = total.toFixed(2);
}

// purpose: if last name is valid
function validateLastName() {
  var last_name = document.getElementsByName("lname")[0];

  // if no last name is put in
  if (last_name.value == "") {
    alert("Please enter your last name");
    return false;
  }

  return true;
}

// purpose: check if phone number is valid
function validatePhone() {
  var phone = document.getElementsByName("phone")[0];

  // if no phone number is put in
  if (phone.value == "") {
    alert("Please enter a phone number");
    return false;
  }

  // if phone number matches regex
  var regex_phone = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
  if (!regex_phone.test(phone.value)) {
    alert("Please enter a valid phone number\nxxx-xxx-xxxx");
    return false;
  }

  return true;
}

// if address is valid
function validateAddress(id) {
  var place = document.getElementsByName(id)[0];

  // if address is empty
  if (place.value == "") {
    alert("Please enter a valid " + id);
    return false;
  }

  return true;
}

// purpose: add asterisks for mandatory delivery
function isDelivery() {
  document.getElementById("s1").innerHTML = "*";
  document.getElementById("s2").innerHTML = "*";
}

// purpose: remove asterisks for pickup
function isPickup() {
  document.getElementById("s1").innerHTML = "";
  document.getElementById("s2").innerHTML = "";
}

// purpose: get eta for deliveries
function getETA(minutes) {
  time = new Date();
  return new Date(time.getTime() + minutes * 60000);
}

// order summary
function message(eta, orderType, totalPrice) {
  var hour = eta.getHours() > 12 ? eta.getHours() - 12 : eta.getHours();
  var minute = eta.getMinutes();
  var amPm = eta.getHours() >= 12 ? "pm" : "am";

  alert(
    "Thanks for your order!\nEstimated " +
      orderType +
      " time: " +
      hour +
      ":" +
      minute.toString().padStart(2, "0") +
      " " +
      amPm +
      "\nTotal amount to be paid: $" +
      totalPrice
  );
}

function validate() {
  var isValid = true;

  /* required validations: last name and phone */
  if (!validateLastName()) isValid = false;
  if (!validatePhone()) isValid = false;

  /* check order type */
  var deliveryTime, orderType;
  var is_pickup = document.getElementsByName("p_or_d")[0].checked;

  /* secondary validations (delivery only): street and city */
  if (!is_pickup) {
    if (!validateAddress("street")) isValid = false;
    if (!validateAddress("city")) isValid = false;
    deliveryTime = 30;
    orderType = "delivery";
  } else {
    deliveryTime = 15;
    orderType = "pickup";
  }

  /* if all the field are valid, output order summary to user */
  var eta = getETA(deliveryTime);
  var totalPrice = document.getElementById("total").value;
  if (isValid) message(eta, orderType, totalPrice);

  return isValid;
}

function makeSelect(name, minRange, maxRange) {
  var t = "";
  t = "<select name='" + name + "' size='1' onchange='updateTotals()'>";
  for (j = minRange; j <= maxRange; j++)
    t += "<option value='" + j + "'>" + j + "</option>";
  t += "</select>";
  return t;
}
