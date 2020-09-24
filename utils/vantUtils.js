import Toast from '../miniprogram_npm/@vant/weapp/toast/toast';

module.exports = {
  vantLoadingToast: function () {
    return Toast.loading({
      duration: 0,
      message: '加载中...',
      forbidClick: true,
    });
  },
  vantFailToast: function () {
    return Toast.fail('获取失败');
  },
  vantSuccessToast: function () {
    return Toast.success('获取成功');
  },
}