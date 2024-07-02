document.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch("http://localhost:8181/pizzasTradicionais");
  const pizzasTradicionaisData = await response.json();

  if (pizzasTradicionaisData) {
    try {
      const pizzaImagesUrl = [
        "./assets/images/pizza/pizza_quatroqueijo.png",
        "./assets/images/pizza/pizza_calabresa.png",
        "./assets/images/pizza/pizza_portuguesa.png",
        "./assets/images/pizza/pizza_peperone.png",
        "./assets/images/pizza/pizza_mussarela.png",
        "./assets/images/pizza/pizza_baiana.png",
        "./assets/images/pizza/pizza_carneseca.png",
        "./assets/images/pizza/pizza_frangocatupiry.png",
      ];

      const cardsContainer = document.querySelector(".pizzas-cards");

      pizzasTradicionaisData.forEach((pizza, index) => {
        const cardPizza = createCard(
          pizza,
          pizzaImagesUrl[index % pizzaImagesUrl.length]
        );
        cardsContainer.appendChild(cardPizza);

        cardPizza.addEventListener("click", () => {
          modalOrders(pizza.id, null);
        });
      });
    } catch (error) {
      console.log(error);
    }
  }

  const responseKalzones = await fetch("http://localhost:8181/kalzoneSalgados");
  const kalzonesSalgadosData = await responseKalzones.json();

  if (kalzonesSalgadosData) {
    try {
      const kalzonesImagesUrl = [
        "./assets/images/kalzones/kalbacon.png",
        "./assets/images/kalzones/kalqueijo.png",
        "./assets/images/kalzones/kalpresunto.png",
        "./assets/images/kalzones/kalfrango.png",
        "./assets/images/kalzones/kalsalame.png",
        "./assets/images/kalzones/kalpeperone.png",
      ];

      const cardsContainer = document.querySelector(".kalzones-cards");

      kalzonesSalgadosData.forEach((kalzone, index) => {
        const cardKalzone = createCard(
          kalzone,
          kalzonesImagesUrl[index % kalzonesImagesUrl.length]
        );
        cardsContainer.appendChild(cardKalzone);

        cardKalzone.addEventListener("click", () => {
          modalOrders(null, kalzone.id);
        });
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log("Não foi possível encontrar a data dos kalzones");
  }

  function createCard(item, imageUrl) {
    const card = document.createElement("div");
    card.classList.add("cardPizza");

    const cardTextContainer = document.createElement("div");
    cardTextContainer.classList.add("card-text-content");

    const cardLeftContent = document.createElement("div");
    cardLeftContent.classList.add("card-left-content");

    const cardTop = document.createElement("div");
    cardTop.classList.add("card-top");

    const cardImgContainer = document.createElement("div");
    cardImgContainer.classList.add("card-pizza-img");

    const cardLine = document.createElement("hr");
    cardLine.classList.add("card-line");

    const pizzaImg = document.createElement("img");
    pizzaImg.classList.add("pizza-img");
    pizzaImg.src = imageUrl;

    const pizzaName = document.createElement("h1");
    pizzaName.classList.add("card-pizza-name");
    pizzaName.textContent = item.nome;

    const pizzaDescription = document.createElement("p");
    pizzaDescription.classList.add("card-pizza-desc");
    pizzaDescription.textContent = item.descricao;

    const pizzaPrice = document.createElement("p");
    pizzaPrice.classList.add("card-pizza-price");
    pizzaPrice.textContent = item.precoPequena;

    card.appendChild(cardLeftContent);
    card.appendChild(cardImgContainer);

    cardLeftContent.appendChild(cardTextContainer);
    cardTextContainer.appendChild(cardTop);
    cardTextContainer.appendChild(cardLine);
    cardTextContainer.appendChild(pizzaPrice);

    cardTop.appendChild(pizzaName);
    cardTop.appendChild(pizzaDescription);

    cardImgContainer.appendChild(pizzaImg);

    toggleModal(card);
    return card;
  }

  //   ########## FUNCIONALIDADE DO SLIDER DOS CARDS DE PIZZAS

  function pizzasSlider() {
    const sliderGrid = document.querySelector(".pizzas-cards");
    const prevBtn = document.querySelector(".prev-btn-pizzas");
    const nextBtn = document.querySelector(".next-btn-pizzas");

    let currentIndex = 0;
    const cardWidth = 325; // Largura do card
    const gap = 5; // Espaço entre os cards

    prevBtn.addEventListener("click", () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateSlider();
      }
    });

    nextBtn.addEventListener("click", () => {
      const visibleCards = Math.floor(
        sliderGrid.parentElement.clientWidth / (cardWidth + gap)
      );
      const maxIndex = sliderGrid.children.length - visibleCards;
      if (currentIndex < maxIndex) {
        currentIndex++;
        updateSlider();
      }
    });

    function updateSlider() {
      const newTransform = -(currentIndex * (cardWidth + gap));
      sliderGrid.style.transform = `translateX(${newTransform}px)`;
    }
  }

  function kalzonesSlider() {
    const sliderGrid = document.querySelector(".kalzones-cards");
    const prevBtn = document.querySelector(".prev-btn-kalzones");
    const nextBtn = document.querySelector(".next-btn-kalzones");

    let currentIndex = 0;
    const cardWidth = 325; // Largura do card
    const gap = 5; // Espaço entre os cards

    prevBtn.addEventListener("click", () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateSlider();
      }
    });

    nextBtn.addEventListener("click", () => {
      const visibleCards = Math.floor(
        sliderGrid.parentElement.clientWidth / (cardWidth + gap)
      );
      const maxIndex = sliderGrid.children.length - visibleCards;
      if (currentIndex < maxIndex) {
        currentIndex++;
        updateSlider();
      }
    });

    function updateSlider() {
      const newTransform = -(currentIndex * (cardWidth + gap));
      sliderGrid.style.transform = `translateX(${newTransform}px)`;
    }
  }

  pizzasSlider();
  kalzonesSlider();

  const path = window.location.pathname;

  const homeLink = document.getElementById("home-link");
  const cardapioLink = document.getElementById("cardapio-link");

  if (path.includes("index.html")) {
    homeLink.classList.add("active-link");
    cardapioLink.classList.remove("active-link");
  } else if (path.includes("cardapio.html")) {
    cardapioLink.classList.add("active-link");
    homeLink.classList.remove("active-link");
  }
});

document.querySelector(".menu-container").addEventListener("click", () => {
  window.location.href = "cardapio.html";
});

function toggleModal(card) {
  const modalContainer = document.querySelector(".modal-container");
  const modalHolder = document.querySelector(".modalHolder");
  const modalCarrinho = document.getElementById("carrinho-modal");
  const carrinhoIcon = document.getElementById("carrinho-icon");
  const perfilModal = document.getElementById("perfil-modal");
  const perfilCircle = document.querySelector(".circle-sign");
  const popUpPedidos = document.querySelector(".pop-up-pedido");
  const body = document.querySelector(".body");

  // Verificações para garantir que todos os elementos necessários foram encontrados
  if (
    !modalContainer ||
    !modalHolder ||
    !modalCarrinho ||
    !perfilCircle ||
    !perfilModal ||
    !body
  ) {
    console.error("Um ou mais elementos não foram encontrados.");
    return;
  }

  openModal(card);

  function openModal(card) {
    if (card) {
      card.addEventListener("click", () => {
        perfilModal.classList.remove("activePerfil");
        modalCarrinho.classList.remove("activeCarrinho");
        modalHolder.classList.add("active");
        modalContainer.classList.add("active");
        popUpPedidos.classList.remove("activePopUp");
        body.style.overflow = "hidden";
      });
    }

    perfilCircle.addEventListener("click", () => {
      perfilModal.classList.add("activePerfil");
      modalCarrinho.classList.remove("activeCarrinho");
      modalHolder.classList.remove("active");
      modalContainer.classList.remove("active");
    });

    carrinhoIcon.addEventListener("click", () => {
      perfilModal.classList.remove("activePerfil");
      modalHolder.classList.remove("active");
      modalContainer.classList.remove("active");
      modalCarrinho.classList.add("activeCarrinho");
    });
  }

  function closeModals() {
    modalCarrinho.classList.remove("activeCarrinho");
    modalHolder.classList.remove("active");
    modalContainer.classList.remove("active");
    perfilModal.classList.remove("activePerfil");
    body.style.overflow = "auto";
    body.style.overflowX = "hidden";
  }

  const modalClosers = document.querySelectorAll(".btn-close-modal");
  modalClosers.forEach((modalCloser) => {
    modalCloser.addEventListener("click", () => {
      closeModals();
    });
  });
}

let addToCartEventAdded = false;

let cartItems = [];
let checkboxValues = 0;
let selectedCheckboxes = [];
let selectedCheckboxesNames = [];

async function modalOrders(pizzaId, kalzoneId) {
  console.log("Função modalOrders executada!");
  const modalItemTitle = document.getElementById("modal-item-name");
  const modalItemDescription = document.getElementById("modal-item-desc");
  const modalItemImg = document.querySelector(".modal-item-img");
  let itemImgUrl = "";
  let itemsModalCost = document.getElementById("items-cost");
  let itemsQuantity = document.getElementById("item-quantity");
  let currentQuantity = parseInt(itemsQuantity.textContent, 10);
  let btnAddItems = document.getElementById("items-add");
  let btnRemoveItems = document.getElementById("items-remove");
  let btnSizeSelectors = document.querySelectorAll(".btn-size-selector");
  const modalContainer = document.querySelector(".modal-container");
  const modalHolder = document.querySelector(".modalHolder");
  const modalContainerActive = modalContainer.classList.contains("active");
  const modalHolderActive = modalHolder.classList.contains("active");
  const body = document.querySelector(".body");

  let smallSizePrice = 0;
  let mediumSizePrice = 0;
  let largeSizePrice = 0;
  let selectedButton = null;
  let modalItemPrice = 39.9;

  if (pizzaId) {
    const responsePizza = await fetch(
      `http://localhost:8181/pizzasTradicionais/${pizzaId}`
    );
    const pizzaIdData = await responsePizza.json();

    if (pizzaIdData) {
      modalItemTitle.innerText = pizzaIdData.nome;
      modalItemDescription.innerText = pizzaIdData.descricao;
      modalItemImg.src = pizzaIdData.urlImage;
      itemImgUrl = pizzaIdData.urlImage;
      modalItemPrice = pizzaIdData.precoPequena;

      smallSizePrice = pizzaIdData.precoPequena;
      mediumSizePrice = pizzaIdData.precoMedia;
      largeSizePrice = pizzaIdData.precoGrande;

      console.log(`preço pequena ${smallSizePrice}`);
      console.log(`preço media ${mediumSizePrice}`);
      console.log(`preço grande ${largeSizePrice}`);
    }
  } else if (kalzoneId) {
    const responseKalzones = await fetch(
      `http://localhost:8181/kalzoneSalgados/${kalzoneId}`
    );
    const kalzoneIdData = await responseKalzones.json();

    if (kalzoneIdData) {
      modalItemTitle.innerText = kalzoneIdData.nome;
      modalItemDescription.innerText = kalzoneIdData.descricao;
      modalItemImg.src = kalzoneIdData.urlImage;
      itemImgUrl = kalzoneIdData.urlImage;
      modalItemPrice = kalzoneIdData.preco;
    }
  }

  const btnAddToCart = document.getElementById("btnAddToCart");

  if (addToCartEventAdded) {
    btnAddToCart.removeEventListener("click", addToCartHandler);
  }

  btnAddToCart.addEventListener("click", addToCartHandler);
  addToCartEventAdded = true;

  function mostrarPopUp() {
    const popUp = document.querySelector(".pop-up-pedido");
    popUp.classList.add("activePopUp");

    setTimeout(() => {
      popUp.classList.add("pop-up-animation");
    }, 1000);

    setTimeout(() => {
      popUp.classList.remove("activePopUp", "pop-up-animation");
    }, 1500);
  }

  function addToCartHandler() {
    if (currentQuantity > 0) {
      addToCart(
        modalItemTitle,
        modalItemDescription,
        modalItemPrice,
        itemsQuantity,
        itemImgUrl,
        checkboxValues,
        selectedCheckboxesNames
      );
    } else {
      alert("Não é possível adicionar sem alterar a quantidade");
    }

    removeFromCartEvent();

    if (currentQuantity > 0) {
      mostrarPopUp();
    }

    resetModal();
    modalContainer.classList.remove("active");
    modalHolder.classList.remove("active");
    body.style.overflow = "auto";
  }

  function removeFromCartEvent() {
    btnAddToCart.removeEventListener("click", addToCartHandler);
    addToCartEventAdded = false;
  }

  function extractPriceB(element) {
    return parseFloat(element.textContent.replace("R$", "").trim());
  }

  btnSizeSelectors.forEach((btn) => {
    btn.classList.remove("size-selected");
  });

  if (modalContainerActive && modalHolderActive) {
    btnAddItems.addEventListener("click", handleAddItems);
    btnRemoveItems.addEventListener("click", handleRemoveItems);
    btnSizeSelectors.forEach((btn) => {
      btn.addEventListener("click", handleSizeButtonClick);
    });

    itemsQuantity.addEventListener("input", () => {
      updateCost(modalItemPrice, itemsQuantity);
    });

    console.log("Eventos adicionados!");
  }

  function handleSizeButtonClick() {
    const isSelected = this === selectedButton;

    if (selectedButton && !isSelected && currentQuantity !== 0) {
      alert("O contador deve ser zerado antes de selecionar um novo tamanho.");
    }

    btnSizeSelectors.forEach((otherBtn) => {
      otherBtn.classList.remove("size-selected");
    });

    if (!isSelected) {
      this.classList.add("size-selected");
      selectedButton = this;

      if (this.classList.contains("pequena")) {
        modalItemPrice = smallSizePrice;
      } else if (this.classList.contains("media")) {
        modalItemPrice = mediumSizePrice;
      } else if (this.classList.contains("grande")) {
        modalItemPrice = largeSizePrice;
      }

      console.log(modalItemPrice);

      itemsQuantity.textContent = "0";
      currentQuantity = 0;
      updateCost(modalItemPrice, currentQuantity);
    }
  }

  function handleAddItems() {
    if (selectedButton) {
      currentQuantity += 1;
      itemsQuantity.textContent = currentQuantity;
      console.log(currentQuantity);
      updateCost(modalItemPrice, currentQuantity);
    } else {
      alert("Selecione um tamanho de pizza antes de adicionar itens.");
    }
    console.log("Função handleAddItems executada!");
  }

  function handleRemoveItems() {
    if (selectedButton && currentQuantity > 0) {
      currentQuantity -= 1;
      itemsQuantity.textContent = currentQuantity;
      console.log(currentQuantity);
      updateCost(modalItemPrice, currentQuantity);
    } else {
      alert("Selecione um tamanho de pizza antes de remover itens.");
    }
    console.log("Função handleRemoveItems executada!");
  }

  function resetModal() {
    const btnAddItems = document.getElementById("items-add");
    const btnRemoveItems = document.getElementById("items-remove");
    const btnSizeSelectors = document.querySelectorAll(".btn-size-selector");
    const itemsQuantity = document.getElementById("item-quantity");
    const itemsModalCost = document.getElementById("items-cost");

    const checkboxes = document.querySelectorAll(".checkboxb");
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });

    checkboxes.forEach((checkbox) => {
      checkbox.removeEventListener("change", handleCheckboxChange);
    });

    btnSizeSelectors.forEach((btn) => {
      btn.classList.remove("size-selected");
    });

    btnAddItems.removeEventListener("click", handleAddItems);
    btnRemoveItems.removeEventListener("click", handleRemoveItems);
    btnSizeSelectors.forEach((btn) => {
      btn.removeEventListener("click", handleSizeButtonClick);
    });

    itemsQuantity.textContent = "0";
    itemsModalCost.textContent = "R$0,00";
    currentQuantity = 0;
    currentCost = 0;
    selectedCheckboxes = [];
    selectedCheckboxesNames = [];
    checkboxValues = 0;

    console.log("Eventos removidos pela função resetModal!");
  }

  const modalClosers = document.querySelectorAll(".btn-close-modal");
  modalClosers.forEach((modalCloser) => {
    modalCloser.addEventListener("click", () => {
      resetModal();
    });
  });

  document.addEventListener("change", (event) => {
    if (event.target.classList.contains("checkboxb")) {
      getSelectedCheckboxes;
    }
  });

  function getSelectedCheckboxes() {
    let checkboxes = document.querySelectorAll(".checkboxb");

    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        selectedCheckboxes.push(parseFloat(checkbox.value));
        const name = checkbox.getAttribute("name");
        selectedCheckboxesNames.push(name);
      }
    });

    console.log("Checkboxes selecionados:", selectedCheckboxes);
    console.log("Checkboxes selecionados (nomes):", selectedCheckboxesNames);
    updateCost(
      modalItemPrice,
      currentQuantity,
      selectedCheckboxes,
      checkboxValues,
      selectedCheckboxesNames
    );
  }

  function handleCheckboxChange() {
    const checkbox = this;
    const checkboxValue = parseFloat(checkbox.value);

    if (checkbox.checked) {
      selectedCheckboxes.push(checkboxValue);
      checkboxValues += checkboxValue;
      const name = checkbox.getAttribute("name");
      selectedCheckboxesNames.push(name);
    } else {
      const index = selectedCheckboxes.indexOf(checkboxValue);
      if (index !== -1) {
        selectedCheckboxes.splice(index, 1);
        checkboxValues -= checkboxValue;
        const nameIndex = selectedCheckboxesNames.indexOf(
          checkbox.getAttribute("name")
        );
        if (nameIndex !== -1) {
          selectedCheckboxesNames.splice(nameIndex, 1);
        }
      }
    }

    updateCost(
      modalItemPrice,
      currentQuantity,
      selectedCheckboxes,
      checkboxValues,
      selectedCheckboxesNames
    );
    console.log("Checkboxes selecionados:", selectedCheckboxes);
    console.log("Checkboxes selecionados (nomes):", selectedCheckboxesNames);
  }

  const checkboxes = document.querySelectorAll(".checkboxb");
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", handleCheckboxChange);
  });
}

async function updateCost(
  modalItemPrice,
  currentQuantity,
  selectedCheckboxes,
  checkboxValues,
  selectedCheckboxesNames
) {
  let currentCost = 0;
  const parsedModalItemPrice = parseFloat(modalItemPrice);

  if (parsedModalItemPrice && currentQuantity > 0) {
    currentCost = parsedModalItemPrice * currentQuantity;
  }

  if (Array.isArray(selectedCheckboxes) && selectedCheckboxes.length > 0) {
    currentCost += checkboxValues;
  }

  const formattedCost = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(currentCost);

  const itemsModalCost = document.getElementById("items-cost");
  if (itemsModalCost) {
    itemsModalCost.textContent = formattedCost;
  }

  console.log("Função updateCost executada");
}

async function addToCart(
  modalItemTitle,
  modalItemDescription,
  modalItemPrice,
  itemsQuantity,
  itemImgUrl,
  checkboxValues,
  selectedCheckboxesNames
) {
  console.log(modalItemPrice);
  console.log(selectedCheckboxesNames);
  console.log("Função addToCart executada!");
  const cardCarrinhoHolder = document.querySelector(".selecionadaCarrinho");
  const cardCarrinho = document.createElement("div");
  const leftContentCardCarrinho = document.createElement("div");
  const priceAndQuantity = document.createElement("div");
  const cardItemName = document.createElement("h2");
  const cardItemDescription = document.createElement("h3");
  const cardItemLine = document.createElement("hr");
  const cardItemPrice = document.createElement("h2");
  const cardItemQuantity = document.createElement("h2");
  const cardItemDrinks = document.createElement("div");
  const cardItemDrinksDiv = document.createElement("div");
  const cardItemDrink = document.createElement("h2");
  const cardItemDrinkPrice = document.createElement("h2");
  const cardImgContainer = document.createElement("div");
  const cardItemImg = document.createElement("img");
  cardItemImg.src = itemImgUrl;

  console.log(checkboxValues);

  cardItemPrice.innerText = modalItemPrice;
  cardItemQuantity.innerText = `Q: ${parseInt(itemsQuantity.textContent)}`;

  cardItemName.innerText =
    modalItemTitle instanceof HTMLElement
      ? modalItemTitle.textContent
      : modalItemTitle;
  cardItemDescription.innerText =
    modalItemDescription instanceof HTMLElement
      ? modalItemDescription.textContent
      : modalItemDescription;
  cardItemDrinkPrice.innerText = `R$ ${
    checkboxValues instanceof HTMLElement
      ? checkboxValues.textContent
      : checkboxValues
  }`;

  selectedCheckboxesNames.forEach((name) => {
    cardItemDrink.innerText = name;
    cardItemDrinksDiv.appendChild(cardItemDrink);
  });

  cardCarrinho.classList.add("divCarrinho");
  priceAndQuantity.classList.add("priceAndQuantity");
  leftContentCardCarrinho.classList.add("left-content-card-carrinho");
  cardItemName.classList.add("cart-item-name");
  cardItemDescription.classList.add("cart-item-desc");
  cardItemPrice.classList.add("cart-item-price");
  cardItemQuantity.classList.add("cart-item-quantity");
  cardImgContainer.classList.add("cart-img-container");
  cardItemImg.classList.add("cart-item-img");
  cardItemLine.classList.add("cart-item-line");
  cardItemDrinks.classList.add("cart-item-drinks");
  cardItemDrinkPrice.classList.add("cart-item-drinksprice");
  cardItemDrink.classList.add("cart-item-drink");
  cardItemDrinksDiv.classList.add("cart-item-drinksdiv");

  cardCarrinhoHolder.appendChild(cardCarrinho);
  cardCarrinho.appendChild(leftContentCardCarrinho);
  leftContentCardCarrinho.appendChild(cardItemName);
  leftContentCardCarrinho.appendChild(cardItemDescription);
  leftContentCardCarrinho.appendChild(cardItemLine);
  leftContentCardCarrinho.appendChild(priceAndQuantity);
  leftContentCardCarrinho.appendChild(cardItemDrinks);
  priceAndQuantity.appendChild(cardItemPrice);
  priceAndQuantity.appendChild(cardItemQuantity);
  cardItemDrinks.appendChild(cardItemDrinksDiv);
  cardItemDrinks.appendChild(cardItemDrinkPrice);
  cardItemDrinksDiv.appendChild(cardItemDrink);
  cardCarrinho.appendChild(cardImgContainer);
  cardImgContainer.appendChild(cardItemImg);

  console.log(modalItemTitle);
  console.log(modalItemDescription);

  const cartItem = {
    title:
      modalItemTitle instanceof HTMLElement
        ? modalItemTitle.textContent
        : modalItemTitle,
    description:
      modalItemDescription instanceof HTMLElement
        ? modalItemDescription.textContent
        : modalItemDescription,
    price: parseFloat(modalItemPrice),
    quantity: parseInt(itemsQuantity.textContent, 10),
    drinks: selectedCheckboxesNames.forEach((drink) => {
      selectedCheckboxesNames instanceof HTMLElement
        ? selectedCheckboxesNames.textContent
        : selectedCheckboxesNames;
    }),
    drinks_price: checkboxValues,
    imgUrl: itemImgUrl,
  };

  cartItems.push(cartItem);

  console.log(cartItems);

  cartPayment(
    modalItemTitle,
    modalItemDescription,
    modalItemPrice,
    itemsQuantity,
    itemImgUrl,
    checkboxValues,
    selectedCheckboxesNames
  );
}

function cartPayment() {
  const taxPrice = document.getElementById("tax-price");
  const taxSubtotal = document.getElementById("tax-subtotal");
  const taxTotal = document.getElementById("tax-total");

  console.log(checkboxValues);

  let subtotal = 0;

  cartItems.forEach((item) => {
    subtotal += item.price * item.quantity + checkboxValues;
  });

  const formattedSubtotal = subtotal.toFixed(2).replace(".", ",");
  taxSubtotal.innerText = `R$ ${formattedSubtotal}`;

  const total = subtotal;
  const formattedTotal = total.toFixed(2).replace(".", ",");
  taxTotal.innerText = `R$ ${formattedTotal}`;

  console.log("Calculated Subtotal:", taxSubtotal.innerText);
  console.log("Calculated Total:", taxTotal.innerText);

  console.log("Função cartPayment executada !");
}

const sobreLink = document.getElementById("about-us-link");

sobreLink.addEventListener("click", function (e) {
  e.preventDefault();

  const footer = document.getElementById("footer");

  footer.scrollIntoView({ behavior: "smooth" });
});
