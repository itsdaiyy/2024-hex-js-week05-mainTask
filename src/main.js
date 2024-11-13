// Import our custom CSS
import "./assets/scss/all.scss";
import "bootstrap/dist/js/bootstrap.min.js";
let data = [
  {
    id: 0,
    name: "肥宅心碎賞櫻3日",
    imgUrl:
      "https://images.unsplash.com/photo-1522383225653-ed111181a951?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1655&q=80",
    area: "高雄",
    description: "賞櫻花最佳去處。肥宅不得不去的超讚景點！",
    group: 87,
    price: 1400,
    rate: 10,
  },
  {
    id: 1,
    name: "貓空纜車雙程票",
    imgUrl:
      "https://images.unsplash.com/photo-1501393152198-34b240415948?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
    area: "台北",
    description:
      "乘坐以透明強化玻璃為地板的「貓纜之眼」水晶車廂，享受騰雲駕霧遨遊天際之感",
    group: 99,
    price: 240,
    rate: 2,
  },
  {
    id: 2,
    name: "台中谷關溫泉會1日",
    imgUrl:
      "https://images.unsplash.com/photo-1535530992830-e25d07cfa780?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
    area: "台中",
    description:
      "全館客房均提供谷關無色無味之優質碳酸原湯，並取用八仙山之山冷泉供蒞臨貴賓沐浴及飲水使用。",
    group: 20,
    price: 1765,
    rate: 7,
  },
];

// # 初始化邏輯
const ticketsRow = document.querySelector(".tickets-row");
const searchResultText = document.querySelector("#searchResult-text");

function init() {
  render(data);
  searchResultText.textContent = `本次搜尋共 ${data.length} 筆資料`;
}

function render(renderData) {
  renderData.forEach((ticket) => {
    const { name, imgUrl, area, description, group, price, rate } = ticket;
    ticketsRow.innerHTML += `<li class="col-lg-4 col-md-6">
              <div class="card ticket-card shadow h-100 border-neutral-400">
                <div class="position-relative">
                  <img
                    src="${imgUrl}"
                    class="card-img-top ticket-card__top-image"
                    alt="${name}套票"
                  />
                  <div
                    class="position-absolute bg-primary-100 text-white px-6 py-3 border-right location-tag"
                  >
                    ${area}
                  </div>
                </div>
                <div class="card-body p-6 position-relative">
                  <div
                    class="position-absolute start-0 top-0 translate-middle-y bg-primary-200 text-white px-3 py-2 border-right "
                  >
                    ${rate.toFixed(1)}
                  </div>
                  <h3
                    class="card-title text-primary border-bottom border-2 border-primary-300 h4 mb-5 lh-sm"
                  >
                    ${name}
                  </h3>
                  <p class="card-text text-600 text-neutral-600">
                 ${description}
                  </p>
                </div>
                <div
                  class="d-flex justify-content-between align-items-center text-primary fw-medium px-6 pb-6"
                >
                  <p>
                    <i class="bi bi-exclamation-circle-fill me-3"></i
                    ><span>剩下最後 ${group} 組</span>
                  </p>
                  <p>
                    <span class="me-2">TWD</span
                    ><span class="h2 align-middle">$${price}</span>
                  </p>
                </div>
              </div>
            </li>`;
  });
}

init();

// # 篩選邏輯
const regionSearchSelect = document.querySelector("#regionSearch");
const cantFindArea = document.querySelector(".cantFind-area");

// 監聽 selector
regionSearchSelect.addEventListener("change", function (e) {
  clearRender();
  filterRenderData(e.target.value);
});

function clearRender() {
  ticketsRow.innerHTML = "";
}

function filterRenderData(renderTarget) {
  if (renderTarget === "") {
    init();
    cantFindArea.style.display = "none";
    return;
  }

  const renderData = data.filter((ticket) => ticket.area === renderTarget);
  searchResultText.textContent = `本次搜尋共 ${renderData.length} 筆資料`;

  if (renderData.length > 0) {
    cantFindArea.style.display = "none";
  } else {
    cantFindArea.style.display = "block";
  }
  render(renderData);
}

// # 新增邏輯
const ticketName = document.querySelector("#inputTicketName");
const ticketImageURL = document.querySelector("#inputImageURL");
const ticketArea = document.querySelector("#selectArea");
const ticketPrice = document.querySelector("#inputTicketPrice");
const ticketCounts = document.querySelector("#inputTicketCounts");
const ticketLevel = document.querySelector("#inputTicketLevel");
const ticketDescriptions = document.querySelector(
  "#textareaTicketDescriptions"
);
const addTicketBtn = document.querySelector("#addTicketBtn");

const addTicketForm = document.querySelector("#addTicketForm");

addTicketBtn.addEventListener("click", function (e) {
  e.preventDefault();

  let obj = {
    id: data.length + 1,
    name: ticketName.value.trim(),
    imgUrl: ticketImageURL.value.trim(),
    area: ticketArea.value.trim(),
    price: Number(ticketPrice.value.trim()),
    group: Number(ticketCounts.value.trim()),
    rate: Number(ticketLevel.value.trim()),
    description: ticketDescriptions.value.trim(),
  };

  // 錯誤驗證
  let errorMsg = "";

  if (!obj.name) {
    errorMsg = "必須填入套票名稱";
  } else if (!obj.imgUrl) {
    errorMsg = "必須填入圖片網址";
  } else if (!obj.area) {
    errorMsg = "必須填入套票地區";
  } else if (!obj.price) {
    errorMsg = "必須填入套票價錢";
  } else if (obj.group < 1) {
    errorMsg = "套票組數必須至少為 1";
  } else if (obj.rate < 1 || obj.rate > 10) {
    errorMsg = "套票星級必須在 1 ~ 10 之間";
  } else if (obj.description.length > 100 || !obj.description) {
    errorMsg = "必須填入套票描述，且不能超過 100 字";
  }

  if (errorMsg) {
    alert(errorMsg);
    return;
  }

  addData(obj);
  resetForm();
});

function addData(obj) {
  data.push(obj);
  clearRender();
  init();
}

function resetForm() {
  addTicketForm.reset();
  regionSearchSelect.value = "";
}
