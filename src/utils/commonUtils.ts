export function getUrlPara(name: string, url = window.location.hash) {
  var reg = new RegExp('(\\?|^|&)' + name + '=([^&]*)(&|$)', 'i');
  var r = url.match(reg);
  if (r != null) return decodeURI(r[2]);
  return null;
}
