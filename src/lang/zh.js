const zh = {
  global: {
    operation: '操作',
    inputEmptyError: '内容不能为空'
  },
  button: {
    edit: '修改',
    add: '添加',
    delete: '删除',
    save: '保存',
    cancel: '取消',
    search: '搜索',
    reset: '重置',
    submit: '提交',
    close: '关闭',
    back: '返回',
    confirm: '确定'
  },
  placeholder: {
    username: '请输入用户名',
    dateRange: {
      start: '选择开始日期',
      end: '选择结束日期'
    }
  },
  dashboard: {
    menu: '面板'
  },

  // 注单管理
  bet: {
    menu: '注单管理',
    lottery: {
      menu: '彩票注单',
      table: {
        username: '会员名',
        cateNameCode: '类目',
        gameNameCode: '彩种',
        playNameCode: '玩法',
        playCodeNameCode: '投注',
        hashResult: '开奖结果',
        num: '期号',
        odds: '赔率',
        money: '金额',
        profitMoney: '赢利',
        payoutMoney: '派彩',
        createTime: '投注时间',
        updateTime: '更新时间',
        status: '状态'
      },
      form: {
        username: '用户名',
        pwd: '密码',
        confirmPwd: '确认密码',
        createTime: '创建时间'
      }
    },
    draw: {
      menu: '抽奖注单',
      table: {
        username: '会员名',
        cateNameCode: '类目',
        gameNameCode: '彩种',
        playNameCode: '玩法',
        playCodeNameCode: '投注',
        hashResult: '开奖结果',
        num: '期号',
        odds: '赔率',
        money: '金额',
        profitMoney: '赢利',
        payoutMoney: '派彩',
        createTime: '投注时间',
        updateTime: '更新时间',
        status: '状态'
      },
      form: {
        username: '用户名',
        pwd: '密码',
        confirmPwd: '确认密码',
        createTime: '创建时间'
      }
    }
  },

  // 会员管理
  member: {
    menu: '会员管理',
    list: {
      menu: '会员列表',
      table: {
        id: '会员id',
        username: '名称',
        money: '金额',
        createTime: '创建时间',
        operate: '操作'
      },
      form: {
        username: '用户名',
        pwd: '密码',
        confirmPwd: '确认密码',
        createTime: '创建时间'
      }
    },
    flow: {
      menu: '会员流水',
      table: {
        username: '会员名',
        beforeMoney: '帐变前金额',
        afterMoney: '帐变后金额',
        flowMoney: '帐变金额',
        item: '帐变项',
        createTime: '帐变时间'
      }
    }
  },

  // 代理管理
  agent: {
    menu: '代理管理',
    index: {
      menu: '代理列表',
      table: {
        id: 'member id',
        username: 'username',
        money: 'money',
        createTime: 'create time',
        operate: 'operate'
      },
      form: {
        username: 'username',
        pwd: 'password',
        confirmPwd: 'confirm password',
        createTime: 'create time'
      }
    },
    commission: {
      menu: '佣金列表',
      table: {
        username: 'username',
        beforeMoney: 'before money',
        afterMoney: 'after money',
        flowMoney: 'flow money',
        item: 'flow item',
        createTime: 'create time'
      }
    }
  },

  // 财务管理
  finance: {
    menu: '财务管理',
    recharge: {
      menu: '充值列表',
      table: {
        id: 'member id',
        username: 'username',
        money: 'money',
        createTime: 'create time',
        operate: 'operate'
      },
      form: {
        username: 'username',
        pwd: 'password',
        confirmPwd: 'confirm password',
        createTime: 'create time'
      }
    },
    withdraw: {
      menu: '提现列表',
      table: {
        username: 'username',
        beforeMoney: 'before money',
        afterMoney: 'after money',
        flowMoney: 'flow money',
        item: 'flow item',
        createTime: 'create time'
      }
    }
  },

  // 彩票管理
  lottery: {
    menu: '彩票管理',
    category: {
      menu: '类目列表',
      table: {
        id: 'id',
        name: '名称'
      }
    },
    game: {
      menu: '游戏列表',
      table: {
        id: 'id',
        name: '名称'
      }
    },
    play: {
      menu: '玩法列表',
      table: {
        id: 'id',
        name: '名称'
      }
    }
  },

  // 系统管理
  system: {
    menu: '系统管理',
    user: {
      menu: '用户列表',
      table: {
        id: 'category id',
        name: 'category name'
      }
    },
    role: {
      menu: '角色列表',
      table: {
        id: 'category id',
        name: 'category name'
      }
    },
    permission: {
      menu: '权限列表',
      table: {
        id: 'play id',
        name: 'play name'
      }
    },
    setting: {
      menu: '系统设置',
      table: {
        id: 'play id',
        name: 'play name'
      }
    }
  }
}

export default zh
