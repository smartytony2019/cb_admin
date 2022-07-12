export default {
  global: {
    operation: 'operation',
    inputEmptyError: 'content can not blank'
  },
  button: {
    edit: 'edit',
    add: 'add',
    delete: 'delete',
    save: 'save',
    cancel: 'cancel',
    search: 'search',
    reset: 'reset',
    submit: 'submit',
    close: 'close',
    back: 'back',
    confirm: 'confirm'
  },
  placeholder: {
    username: 'input username',
    dateRange: {
      start: 'select start date',
      end: 'select end date'
    }
  },
  dashboard: {
    menu: 'dashboard'
  },

  // 注单管理
  bet: {
    menu: 'Bet Manager',
    lottery: {
      menu: 'Lottery Bet',
      table: {
        username: 'username',
        cateNameCode: 'category',
        gameNameCode: 'game',
        playNameCode: 'play',
        playCodeNameCode: 'bet',
        hashResult: 'result',
        num: 'number',
        odds: 'odds',
        money: 'money',
        profitMoney: 'profit money',
        payoutMoney: 'payout money',
        createTime: 'bet time',
        updateTime: 'update time',
        status: 'status'
      },
      form: {
        username: 'username',
        pwd: 'password',
        confirmPwd: 'confirm password',
        createTime: 'create time'
      }
    },
    draw: {
      menu: 'Draw Bet',
      table: {
        username: 'username',
        cateNameCode: 'category',
        gameNameCode: 'game',
        playNameCode: 'play',
        playCodeNameCode: 'bet',
        hashResult: 'result',
        num: 'number',
        odds: 'odds',
        money: 'money',
        profitMoney: 'profit money',
        payoutMoney: 'payout money',
        createTime: 'bet time',
        updateTime: 'update time',
        status: 'status'
      },
      form: {
        username: 'username',
        pwd: 'password',
        confirmPwd: 'confirm password',
        createTime: 'create time'
      }
    }
  },

  // 会员管理
  member: {
    menu: 'Member Manager',
    list: {
      menu: 'Member List',
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
    flow: {
      menu: 'member Flow',
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

  // 代理管理
  agent: {
    menu: 'Agent Manager',
    index: {
      menu: 'Agent List',
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
      menu: 'Commission List',
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
    menu: 'Finance Manager',
    recharge: {
      menu: 'Recharge List',
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
      menu: 'Withdraw List',
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
    menu: 'Lottery Manager',
    category: {
      menu: 'Category List',
      table: {
        id: 'category id',
        name: 'category name'
      }
    },
    game: {
      menu: 'Game List',
      table: {
        id: 'category id',
        name: 'category name'
      }
    },
    play: {
      menu: 'Play List',
      table: {
        id: 'play id',
        name: 'play name'
      }
    }
  },

  // 彩票管理
  system: {
    menu: 'System Manager',
    user: {
      menu: 'User List',
      table: {
        id: 'category id',
        name: 'category name'
      }
    },
    role: {
      menu: 'Role List',
      table: {
        id: 'category id',
        name: 'category name'
      }
    },
    permission: {
      menu: 'Permission List',
      table: {
        id: 'play id',
        name: 'play name'
      }
    },
    setting: {
      menu: 'Setting',
      table: {
        id: 'play id',
        name: 'play name'
      }
    }
  }
}
