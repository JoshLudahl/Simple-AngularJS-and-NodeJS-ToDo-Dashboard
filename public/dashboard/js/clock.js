function JSClock() {
  var time = new Date();
  var hour = time.getHours();
  var minute = time.getMinutes();
  var second = time.getSeconds();
  var temp = "" + ((hour > 12) ? hour - 12 : hour);
  if (hour == 0)
    temp = "12";
  temp += ((minute < 10) ? ":0" : ":") + minute;
  //temp += ((second < 10) ? ":0" : ":") + second;
  temp += (hour >= 12) ? " PM" : " AM";
  return temp;
}
