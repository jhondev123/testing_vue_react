<template>
  <div class="cashier">
    <div class="header">
      <h1>ZANDONA INFORMATICA LTDA</h1>
      <div class="header-right">
        <p>Caixa: ADMINISTRADOR</p>
        <p>18/09/24 16:37 Cx:01/1</p>
      </div>
    </div>
    <div class="content">
      <div class="left-column">
        <h2>Produtos</h2>
        <div v-for="product in products" :key="product.id" class="product-card">
          <h5>{{ product.id }} {{ product.name }}</h5>
          <p>${{ product.price.toFixed(2) }}</p>
        </div>
      </div>
      <div class="right-column">
        <div class="input-section">
          <div class="input-group">
            <label for="inputQtdProduct">Quantidade</label>
            <input
              v-model="inputQtd"
              type="text"
              id="inputQtdProduct"
              placeholder="1,00"
              @keyup.enter="handleAddToCart"
            />
          </div>
          <div class="input-group">
            <label for="inputCode">Código</label>
            <input
              v-model="inputProduct"
              type="text"
              id="inputCode"
              @keyup.enter="handleAddToCart"
            />
          </div>
          <div class="input-group">
            <label for="inputUnitValue">Valor Unitário</label>
            <input
             v-model="productPrice"
              type="text"
              id="inputUnitValue"
              placeholder="0,00"
              readonly
            />
          </div>
          <div class="input-group">
            <label for="inputTotalValue">Valor Total do Item</label>
            <input
              type="text"
              id="inputTotalValue"
              readonly
            />
          </div>
          <div class="input-group">
            <label for="productName">Produto</label>
            <input
            v-model="productName"
              type="text"
              id="productName"
            />
          </div>
          <div class="input-group">
            <label for="inputPaymentCondition">Condição de Pgto.</label>
            <input
              type="text"
              id="inputPaymentCondition"
              value="1-À Vista"
              readonly
            />
          </div>
          <div class="input-group">
            <label for="inputSeller">Vendedor</label>
            <input
              type="text"
              id="inputSeller"
              value=""
              readonly
            />
          </div>
        </div>
        <div class="cart-section">
          <h3>NFC-e Nº 000075</h3>
          <div v-for="item in cart" :key="item.product.id" class="cart-item">
            <p>{{ item.product.name }} ({{ item.qtd }}) - R$ {{ item.total.toFixed(2) }}</p>
          </div>
        </div>
        <div class="total-section">
          <h3>Sub - Total</h3>
          <p>R$ {{ total.toFixed(2) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
  import { ref, reactive, onMounted } from 'vue';
  
  export default {
    setup() {
      const products = ref([]);
      const paymentMethods = ref([]);
      const cart = ref([]);
      const total = ref(0);
      const inputProduct = ref('');
      const productName = ref('');
      const productPrice = ref(0);
      const inputQtd = ref(1);
      const selectedPaymentMethod = ref(null);
  
      const staticProducts = [
        { id: 1, name: 'Café', price: 5.0 },
        { id: 2, name: 'Pão', price: 2.0 },
        { id: 3, name: 'Leite', price: 4.0 },
        { id: 4, name: 'Suco', price: 3.5 },
      ];
  
      const staticPaymentMethods = [
        { id: 1, name: 'Dinheiro', description: 'Pagamento em dinheiro' },
        { id: 2, name: 'Cartão', description: 'Pagamento em cartão' },
        { id: 3, name: 'Pix', description: 'Pagamento em Pix' },
      ];
  
      onMounted(() => {
        products.value = staticProducts;
        paymentMethods.value = staticPaymentMethods;
      });
  
      const handleAddToCart = () => {
        const productId = parseInt(inputProduct.value);
        const qtd = parseInt(inputQtd.value);
  
        if (isNaN(productId) || productId <= 0) {
          alert('Código do produto inválido');
          return;
        }
  
        if (isNaN(qtd) || qtd <= 0) {
          alert('Quantidade inválida');
          return;
        }
  
        const product = products.value.find((p) => p.id === productId);
        if (!product) {
          alert('Produto não encontrado');
          return;
        }
  
        const totalPrice = product.price * qtd;
  
        const existingCartItem = cart.value.find((item) => item.product.id === productId);
        if (existingCartItem) {
          existingCartItem.qtd += qtd;
          existingCartItem.total += totalPrice;
        } else {
          cart.value.push({ product, qtd, total: totalPrice });
        }
  
        total.value += totalPrice;
        inputProduct.value = '';
        productName.value = product.name;
        productPrice.value = product.price.toFixed(2);
        inputQtd.value = 1;
      };
  
      const removeCartItem = (cartItem) => {
        cart.value = cart.value.filter((item) => item !== cartItem);
        total.value -= cartItem.total;
      };
  
      return {
        products,
        paymentMethods,
        cart,
        total,
        inputProduct,
        productName,
        productPrice,
        inputQtd,
        selectedPaymentMethod,
        handleAddToCart,
        removeCartItem,
      };
    },
  };
  </script>
  
  <style scoped>
  .cashier {
    font-family: Arial, sans-serif;
    background-color: #0052A5;
    color: white;
    padding: 20px;
  }
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .content {
    display: flex;
  }
  
  .left-column {
    width: 25%;
    padding-right: 20px;
  }
  
  .right-column {
    width: 75%;
    display: flex;
    flex-direction: column;
  }
  
  .input-section {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    margin-bottom: 20px;
  }
  
  .input-group {
    display: flex;
    flex-direction: column;
  }
  
  input {
    background-color: white;
    border: none;
    padding: 5px;
  }
  
  .cart-section {
    background-color: white;
    color: black;
    padding: 10px;
    margin-bottom: 20px;
    height: 200px;
    overflow-y: auto;
  }
  
  .total-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    color: black;
    padding: 10px;
  }
  
  .product-card, .cart-item {
    background-color: rgba(255, 255, 255, 0.1);
    padding: 10px;
    margin-bottom: 10px;
  }
  </style>