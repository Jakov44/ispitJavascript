const layout = function () {
  return `<div>
          <div><img src="./spinning-loading.gif" alt="loader" class="hidden" id="spinner"></div>
          <div id="results"></div>
          </div>`;
};

document.getElementById("app").innerHTML = layout();

const prikaziRezultate = function (data) {
  document.getElementById("results").innerHTML = data;
};

const dohvatiRezultate = async function () {
  const ime = document.getElementById("input").value;
  document.getElementById("results").innerHTML = "";
  document.getElementById("slika").classList.add("hidden");
  document.getElementById("spinner").classList.remove("hidden");
  const a = await fetch(
    `http://universities.hipolabs.com/search?country=${ime}`
  );
  const b = await a.json();
  document.getElementById("spinner").classList.add("hidden");
  return b.slice(0, 10);
};

const layoutRezultati = function (rez) {
  if (!rez[0].country) {
    return `<p>Nema rezultata za vaš traženi pojam</p>`;
  } else {
    return `<h3>Rezultat za upit: ${rez[0].country}</h3>
          <ul>
          ${rez
            .map((elem) => {
              return `<li><a href="${elem.web_pages}">${elem.name}</a/li>`;
            })
            .join("")}
          </ul>
`;
  }
};

const layoutError = function () {
  return `<p>Nema rezultata za vaš traženi pojam</p>`;
};

document.getElementById("input").addEventListener("change", (event) => {
  dohvatiRezultate()
    .then((rezultat) => {
      prikaziRezultate(layoutRezultati(rezultat));
    })
    .catch((error) => prikaziRezultate(layoutError()));
});
