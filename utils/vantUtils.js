import Toast from '../miniprogram_npm/@vant/weapp/toast/toast';

module.exports = {
  vantToast: function () {
    return Toast.loading({
      duration: 0,
      message: '加载中...',
      forbidClick: true,
    });
  },
}