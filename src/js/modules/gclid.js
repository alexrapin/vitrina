export default function getGclid() {
  let gclidData = "";
  function getUrlParameter(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    const regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
    const results = regex.exec(window.location.search);
    return results === null
      ? ""
      : decodeURIComponent(results[1].replace(/\+/g, " "));
  }

  window.addEventListener("load", function () {
    const gclid = getUrlParameter("gclid");

    if (gclid) {
      gclidData = gclid;
    }

    const links = document.querySelectorAll("a");

    links.forEach((link) => {
      let url = new URL(link.href);
      url.searchParams.set("gclid", gclidData);
      link.href = url.toString();
    });
  });
}
