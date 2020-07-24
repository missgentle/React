import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { Localization } from '@material-ui/core/locale';

const zhCN: Localization = {
  props: {
    // MuiBreadcrumbs: {
    //   expandText: '显示所有',
    // },
    MuiTablePagination: {
      backIconButtonText: '上一页',
      labelRowsPerPage: '每页行数:',
      labelDisplayedRows: ({ from, to, count }) =>
        `${from}-${to} 的 ${count !== -1 ? count : `超过 ${to}`}`,
      nextIconButtonText: '下一页',
    },
    MuiRating: {
      getLabelText: (value) => `${value} 星${value !== 1 ? '星' : ''}`,
      // emptyLabelText: '空',
    },
    MuiAutocomplete: {
      clearText: '清除',
      closeText: '关闭',
      loadingText: '加载中…',
      noOptionsText: '无选项',
      openText: '打开',
    },
    MuiAlert: {
      closeText: '关闭',
    },
    // MuiPagination: {
    //   'aria-label': 'Pagination navigation',
    //   getItemAriaLabel: (type, page, selected) => {
    //     if (type === 'page') {
    //       return `${selected ? '' : '跳到'}第 ${page} 页`;
    //     }
    //     if (type === 'first') {
    //       return '第一页';
    //     }
    //     if (type === 'last') {
    //       return '最后一页';
    //     }
    //     if (type === 'next') {
    //       return '下一页';
    //     }
    //     if (type === 'previous') {
    //       return '上一页';
    //     }
    //     return undefined;
    //   },
    // },
  },
};

export const BlueTheme = createMuiTheme({
  palette: {
    common: {
      black: "#000",
      white: "#fff"
    },
    primary: {
      main: "#2a77ab", //设置color="primary"
    },
    secondary: {
      main: "#2468a9", //设置color="secondary"
    },
    text:{
      primary: "#000", //输入框文本颜色
      secondary: "#404040",
      disabled: "#a0a0a0",
      hint: "#707070"
    },
    background: {
      paper: "#fff", //下拉框选项背景色; paper默认背景色
      default: "#2a77ab",
    },
    action: {
      active: "#000",  //下拉框下拉按钮; 设置color="action"
      hover: "#bbe1fb", //下拉框&分页悬浮背景色
      selected: "#5ebcfb", //下拉框&分页选中背景色
      disabled: "#d0d0d0",
      disabledBackground: "#fdfdf3", //disabled=true的控件背景色
      focus: "#2a77ab"
    },
    tonalOffset: 0.2, //颜色dark&light与main的计算参数
    // type: "dark", // or "light" 
  },

  typography: {
    htmlFontSize: 24, //行内样式无法更改大小的控件
    fontSize: 16,
    fontFamily: "微软雅黑, Arial",
    subtitle1: {
      fontSize: 16,
      fontFamily: "微软雅黑",
      fontWeight: 700
    },
    subtitle2: {
      fontSize: 14,
      fontFamily: "微软雅黑",
      fontWeight: 700,
      color: "#fff"
    },
    body1: { // Typography默认样式
      fontSize: 12,
      color: "#3d3e40",
    },
    body2: {
      fontSize: 12,
      color: "#000",
    },
    button: {
      fontSize: 12, // Button控件文字大小
    },
  },

  spacing: 1,
  
}, zhCN);
