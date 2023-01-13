export default (date) => {
  let newDate = new Date(date);

  return `${newDate.getHours()}:${newDate.getMinutes()} ${newDate.getDate()}/${
    newDate.getMonth() + 1
  }/${newDate.getFullYear()}`;
};
