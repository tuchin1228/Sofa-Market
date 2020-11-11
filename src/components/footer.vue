<template>
  <footer>
    <div class="contain">
      <div class="left">
        <h2>SOFA STORE</h2>
        <div class="link">
          <a href=""><i class="fab fa-facebook-square"></i></a>
          <a href=""><i class="fab fa-instagram"></i></a>
        </div>
      </div>
      <h3 class="copyright">僅個人練習，非商用</h3>
      <div class="right">
        <p>06-1234567</p>
        <p>sofastore@gmail.com</p>
        <p>台南市北區沒有路87號</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
footer {
  width: 100%;
  height: 100px;
  margin-top: 5vh;
  padding: 10px 0 5px 0;
  background: #d4edff;

  .contain {
    width: 1240px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      h2 {
        font-weight: 600;
        font-size: 1.5em;
        color: #568bb1;
        margin: 0;
      }
      .link {
        a {
          font-size: 1.8em;
          color: #568bb1;
          i {
            margin-right: 10px;
          }
        }
      }
    }
    h3.copyright {
      letter-spacing: 1.5px;
      color: #568bb1;
      font-weight: 300;
      font-size: 1.1em;
    }
    .right {
      p {
        text-align: right;
        margin: 0;
        letter-spacing: 1.5px;
        color: #568bb1;
      }
    }
  }
}
@media all and (max-width: 767px) {
  footer {
      height: auto;
      padding: 3vh 0;
    .contain {
      width: 100%;
      flex-direction: column;
      text-align: center;
      h3.copyright{
          margin: 3vh 0;
      }
      .right{
          p{
              text-align: center;
          }
      }
    }
  }
}

@media all and (max-width: 1259px) and (min-width: 768px) {
     footer {
         .contain{
             width: 90%;
         }
     }
}
</style>
