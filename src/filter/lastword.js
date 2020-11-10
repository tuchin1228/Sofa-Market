export default function (str) {
  return str.split('').splice(0, str.length - 2).join('');
}
