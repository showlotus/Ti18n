function aa() {
  console.log("a");
}

const str = `{
  "$meta": {
    "locales": ["zh-CN", "en-US"]
  },
  "hso.sn.message.common.selectDataThenContinue": {
    "zh-CN": "请选择数据后操作",
    "en-US": "Please select data before proceeding."
  },
  "hso.sn.message.common.autoSaveThenContinue": {
    "zh-CN": "数据尚未保存，将自动保存并继续执行操作。",
    "en-US": "The data has not been saved yet. It will be automatically saved and continued."
  },
  "hso.sn.message.common.cancelSuccessfully": {
    "zh-CN": "取消成功",
    "en-US": "Cancel Successfully"
  },
  "hso.sn.message.common.modifyDataThenSave": {
    "zh-CN": "请修改数据后保存",
    "en-US": "Please save after modifying the data."
  },
  "hso.sn.message.common.saveSuccessfully": {
    "zh-CN": "保存成功",
    "en-US": "Save Successfully"
  },
  "hso.sn.message.common.isDeveloping": {
    "zh-CN": "功能开发中，敬请期待",
    "en-US": "In development, stay tuned for new features."
  },
  "hso.sn.message.common.invalidSuccessfully": {
    "zh-CN": "失效成功",
    "en-US": "Invalid Successfully"
  },
  "hso.sn.message.common.effectiveSuccessfully": {
    "zh-CN": "生效成功",
    "en-US": "Effective Successfully"
  },
  "hso.sn.message.common.confirmCloseNotBeenSaved": {
    "zh-CN": "修改的信息未保存，是否确认关闭？",
    "en-US": "Changes have not been saved. Are you sure you to close?"
  },
  "hso.sn.message.common.confirmCancelNotBeenSaved": {
    "zh-CN": "修改的信息未保存，是否确认取消？",
    "en-US": "Changes have not been saved. Are you sure you to cancel?"
  },

  "hso.sn.message.batchRule.addOnePropThenCreate": {
    "zh-CN": "至少添加一条属性后再创建",
    "en-US": "Please add at least one grouping attribute before creating."
  },
  "hso.sn.message.batchRule.writeAllPropsThenCreate": {
    "zh-CN": "请填写行上所有分批属性编码后创建",
    "en-US": "Please fill in all grouping attributes before creating."
  },
  "hso.sn.message.batchRule.repeatProps": {
    "zh-CN": "分批规则类型已存在",
    "en-US": "Shipping group type is already in use."
  },
  "hso.sn.message.batchRule.confirmCancel": {
    "zh-CN": "确认要取消吗？",
    "en-US": "Are you sure you want to cancel?"
  },
  "hso.sn.message.batchRule.onlyCanDeleteUnsavedRule": {
    "zh-CN": "仅支持删除新增且未保存的规则",
    "en-US": "Only the newly added and unsaved rule can be added."
  },
  "hso.sn.message.batchRule.completeAllThenCreate": {
    "zh-CN": "请填写完整所有属性后再更新",
    "en-US": "Please complete all grouping attributes before updating."
  },
  "hso.sn.message.batchRule.confirmContinue": {
    "zh-CN": "失效后该规则将不可用，是否继续？",
    "en-US": "This rule will be unavailable after Invalidation. Sure to Continue?"
  },
  "hso.sn.message.batchRule.selectRuleFromQueryPage": {
    "zh-CN": "无数据，请从查询页跳转后操作",
    "en-US": "No data available. Please select a shipping rule from the query page to process."
  },
  "hso.sn.message.batchRule.saveBeforeInvalidation": {
    "zh-CN": "请保存后再失效",
    "en-US": "Please save before Invalidation"
  },

  "hso.sn.message.delivery.saveBasicInfoThenContinue": {
    "zh-CN": "请先保存交货单基础信息后再操作",
    "en-US": "Please save the delivery basic information first."
  },
  "hso.sn.message.delivery.completeTheRequiredFields": {
    "zh-CN": "请先维护基础信息中必填项",
    "en-US": "Please complete the required fields in the basic information first."
  },
  "hso.sn.message.delivery.confirmPartIsNotCanBeCancelled": {
    "zh-CN": "部分交货单不可取消，是否确认继续？",
    "en-US": "Some delivery cannot be cancelled. Are you sure to proceed?"
  },
  "hso.sn.message.delivery.confirmCancel": {
    "zh-CN": "交货单取消后将不可撤回，是否确认继续？",
    "en-US": "Once the delivery is cancelled, it cannot be undone. Are you sure to proceed?"
  },
  "hso.sn.message.delivery.cannotModify": {
    "zh-CN": "交货单已取消，无法更改",
    "en-US": "The delivery has been cancelled and cannot be modified."
  },
  "hso.sn.message.delivery.moreThanZero": {
    "zh-CN": "请确保总数量大于0",
    "en-US": "Delivery quantity and damage quantity can not be zero at the same time."
  },
  "hso.sn.message.delivery.uploadDocument": {
    "zh-CN": "请先上传验收文档",
    "en-US": "Please upload the acceptance document first."
  },
  "hso.sn.message.delivery.selectFromQueryPage": {
    "zh-CN": "无数据，请从查询页面选择交货单跳转后再处理",
    "en-US": "No data available. Please select a delivery from the query page to process."
  },
  "hso.sn.message.delivery.redirectToQueryPage": {
    "zh-CN": "交货成功，将跳转至交货单查询页面",
    "en-US": "Deliver successfully, redirecting to delivery inquiry page."
  },
  "hso.sn.message.delivery.cannotConfirm": {
    "zh-CN": "交货单已确认，无法再次确认",
    "en-US": "The delivery has been confirmed and cannot be confirmed again."
  },
  "hso.sn.message.delivery.confirmPartIsNotCanBeConfirmed": {
    "zh-CN": "部分交货单不可确认，确认继续？",
    "en-US": "Some delivery cannot be confirmed. Are you sure to proceed?"
  },
  "hso.sn.message.delivery.confirm": {
    "zh-CN": "确认要进行交货确认吗？",
    "en-US": "Do you want to confirm the delivery?"
  },
  "hso.sn.message.delivery.confirmSuccessfully": {
    "zh-CN": "交货确认成功",
    "en-US": "Confirm Successfully"
  },
  "hso.sn.message.delivery.confirmDelete": {
    "zh-CN": "确定要删除吗？",
    "en-US": "Do you want to delete this?"
  },
  "hso.sn.message.delivery.deleteSuccessfully": {
    "zh-CN": "删除成功",
    "en-US": "Delete Successfully"
  },
  "hso.sn.message.delivery.confirmCreate": {
    "zh-CN": "确认要创建交货单吗？",
    "en-US": "Are you sure to created delivery?"
  },
  "hso.sn.message.delivery.cannotCancel": {
    "zh-CN": "交货单已确认，不可取消",
    "en-US": "The delivery has been confirmed and cannot be cancelled."
  },

  "hso.sn.message.shipmentNote.checkThenReselect": {
    "zh-CN": "存在可发货数量不大于0的订单行，请检查可发货数量后重新勾选",
    "en-US": "Order lines with available quantity less than or equal to 0, please check available quantity and reselect."
  },
  "hso.sn.message.shipmentNote.selectOrderThenContinue": {
    "zh-CN": "请挑选订单后再操作",
    "en-US": "Please select an order before proceeding."
  },
  "hso.sn.message.shipmentNote.saveRequiredInfo": {
    "zh-CN": "请先保存发货单头信息后再操作",
    "en-US": "Please save the shipmentNote header information first."
  },
  "hso.sn.message.shipmentNote.confirmCancel": {
    "zh-CN": "发货单取消后将不可撤销，是否确认继续？",
    "en-US": "Once the shipmentNote is cancelled, it cannot be undone. Are you sure to proceed?"
  },
  "hso.sn.message.shipmentNote.confirmReserve": {
    "zh-CN": "确定要预留吗？",
    "en-US": "Are you sure to reserve?"
  },
  "hso.sn.message.shipmentNote.reservingThenRefreshPageLater": {
    "zh-CN": "预留中，请稍后刷新页面查看结果。",
    "en-US": "Reserving. Please refresh the page later to view the results."
  },
  "hso.sn.message.shipmentNote.confirmPick": {
    "zh-CN": "确定要挑库吗？",
    "en-US": "Are you sure to pick?"
  },
  "hso.sn.message.shipmentNote.pickingThenRefreshPageLater": {
    "zh-CN": "挑库中，请稍后刷新页面查看结果。",
    "en-US": "Picking. Please refresh the page later to view the results."
  },
  "hso.sn.message.shipmentNote.confirmShip": {
    "zh-CN": "确定要发运吗？",
    "en-US": "Are you sure to ship?"
  },
  "hso.sn.message.shipmentNote.shipSuccessfully": {
    "zh-CN": "发运成功",
    "en-US": "Ship Successfully"
  },
  "hso.sn.message.shipmentNote.confirmHold": {
    "zh-CN": "确定要挂起吗？",
    "en-US": "Are you sure to hold?"
  },
  "hso.sn.message.shipmentNote.holdSuccessfully": {
    "zh-CN": "挂起成功",
    "en-US": "Hold Successfully"
  },
  "hso.sn.message.shipmentNote.confirmUnhold": {
    "zh-CN": "确定要解挂吗？",
    "en-US": "Are you sure to unhold?"
  },
  "hso.sn.message.shipmentNote.unholdSuccessfully": {
    "zh-CN": "解挂成功",
    "en-US": "Unhold Successfully"
  },
  "hso.sn.message.shipmentNote.confirmCancelReserve": {
    "zh-CN": "确定要取消预留吗？",
    "en-US": "Are you sure to unreserve?"
  },
  "hso.sn.message.shipmentNote.cancelReservingThenRefreshPageLater": {
    "zh-CN": "取消预留中，请稍后刷新页面查看结果。",
    "en-US": "Cancelling Reservation. Please refresh the page later to view the results."
  },
  "hso.sn.message.shipmentNote.createDelivery": {
    "zh-CN": "确定要创建交货单吗？",
    "en-US": "Are you sure to create delivery?"
  },
  "hso.sn.message.shipmentNote.redirectedToDetailsPage": {
    "zh-CN": "交货单已创建完成，是否跳转至详情页面？",
    "en-US": "The delivery has been created. Would you like to be redirected to the details page?"
  },
  "hso.sn.message.shipmentNote.writeBasicInfo": {
    "zh-CN": "请先填写基础信息中的制单人",
    "en-US": "Please fill in the Applicant in the basic information first."
  },
  "hso.sn.message.shipmentNote.selectFromQueryPage": {
    "zh-CN": "无数据，请从查询页选择发货单跳转后再处理",
    "en-US": "No data available. Please select a shipmentNote from the query page to process."
  },
  "hso.sn.message.shipmentNote.SignedNotRepeat": {
    "zh-CN": "发货单已签收，无需重复操作",
    "en-US": "The ShipmentNote has already been signed, no need to repeat it."
  },
  "hso.sn.message.shipmentNote.onlyShippedCanBeSigned": {
    "zh-CN": "仅已发运的发货单可签收",
    "en-US": "Only the shipped ShipmentNote can be signed. "
  },
  "hso.sn.message.shipmentNote.deliveredNotRepeat": {
    "zh-CN": "发货单已交货，无需重复操作",
    "en-US": "The ShipmentNote has already been delivered, no need to repeat it."
  },
  "hso.sn.message.shipmentNote.onlySignedCanBeDelivered": {
    "zh-CN": "仅已签收的发货单可交货",
    "en-US": "Only the signed ShipmentNote can be delivered. "
  },
  "hso.sn.message.shipmentNote.cancelReserveThenCancel": {
    "zh-CN": "发货单已预留，请先取消预留再取消发货单",
    "en-US": "This ShipmentNote has already been reserved. Please cancel the reservation and then cancel it. "
  },
  "hso.sn.message.shipmentNote.onlyReleasedCanBeCancelled": {
    "zh-CN": "仅已发放的发货单可取消",
    "en-US": "Only the released ShipmentNote can be cancelled. "
  },
  "hso.sn.message.shipmentNoteLine.confirmUndoCancelThenContinue": {
    "zh-CN": "发货单行取消后将不可撤销，是否确认继续？",
    "en-US": "Once the shipmentNoteLine is cancelled, it cannot be undone. Are you sure to proceed?"
  },
  "hso.sn.message.shipmentNoteLine.confirmPartIsNotCanBeCancelled": {
    "zh-CN": "部分发货单行不可取消，确认继续？",
    "en-US": "Some shipmentNoteLines cannot be canceled. Are you sure to proceed?"
  },
  "hso.sn.message.shipmentNoteLine.signedNotRepeat": {
    "zh-CN": "发货单行已签收，无需重复操作",
    "en-US": "The ShipmentNoteLine has already been signed, no need to repeat it."
  },
  "hso.sn.message.shipmentNoteLine.onlyShippedCanBeSigned": {
    "zh-CN": "仅发运状态的发货单行可签收",
    "en-US": "Only the shipped ShipmentNoteLine can be signed. "
  },
  "hso.sn.message.shipmentParameter.confirmInvalid": {
    "zh-CN": "发运参数失效后将无法应用，是否确认继续？",
    "en-US": "Invalid the shipping parameter will become no available. Are you sure to proceed?"
  },
  "hso.sn.message.shipmentNote.confirmSign": {
    "zh-CN": "确定要签收吗？",
    "en-US": "Are you sure to sign?"
  },
  "hso.sn.message.shipmentNote.signSuccessfully": {
    "zh-CN": "签收成功",
    "en-US": "Sign Successfully"
  },
  "hso.sn.message.shipmentNote.confirmPartIsUnsatisfied": {
    "zh-CN": "部分发货单未满足条件，是否继续操作？",
    "en-US": "Some shipmentNote is be unsatisfied. Are you sure to proceed?"
  },
  "hso.sn.message.shipmentNote.update.check": {
    "zh-CN": "仅{已发放}且{未挂起}的发货单可欠料检查",
    "en-US": "Only the {released} and {unhold} ShipmentNote can be checked."
  },
  "hso.sn.message.shipmentNote.update.reserve": {
    "zh-CN": "仅{已发放}且{未挂起}的发货单可预留",
    "en-US": "Only the {released} and {unhold} ShipmentNote can be reserved."
  },
  "hso.sn.message.shipmentNote.update.pick": {
    "zh-CN": "仅{已发放}、{已预留}且{未挂起}的发货单可挑库",
    "en-US": "Only the {released}/{reserved} and {unhold} ShipmentNote can be picked."
  },
  "hso.sn.message.shipmentNote.update.ship": {
    "zh-CN": "仅{已发放}、{已预留}、{已挑库}的发货单可发运",
    "en-US": "Only the {released}/{reserved}/{picked} ShipmentNote can be shipped."
  },
  "hso.sn.message.shipmentNote.update.sign": {
    "zh-CN": "仅{已发运}的发货单可签收",
    "en-US": "Only the {shipped} ShipmentNote can be signed."
  },
  "hso.sn.message.shipmentNoteLine.update.sign": {
    "zh-CN": "仅{已发运}的发货单行可签收",
    "en-US": "Only the {shipped} ShipmentNoteLine can be signed."
  },
  "hso.sn.message.shipmentNote.update.delivery": {
    "zh-CN": "仅{已签收}的发货单可交货",
    "en-US": "Only the {signed} ShipmentNote can be delivered."
  },
  "hso.sn.message.shipmentNote.update.unreserve": {
    "zh-CN": "仅{已预留}的发货单可取消预留",
    "en-US": "Only the {reserved} ShipmentNote can be unreserved."
  },
  "hso.sn.message.shipmentNote.update.cancel": {
    "zh-CN": "仅{已发放}、{预留}且{未挂起}的发货单可取消",
    "en-US": "Only the {released} and {unhold} ShipmentNote can be cancelled."
  },
  "hso.sn.message.shipmentNoteLine.update.cancel": {
    "zh-CN": "仅{已发放}、{预留}且{未挂起}的发货单行可取消",
    "en-US": "Only the {released} and {unhold} ShipmentNoteLine can be cancelled."
  },
  "hso.sn.message.shipmentNote.update.hold": {
    "zh-CN": "仅{已发放}、{预留}、{挑库}且{未挂起}的发货单可挂起",
    "en-US": "Only the {released}/{reserved}/{picked} and {unhold} ShipmentNote can be hold."
  },
  "hso.sn.message.shipmentNote.update.unhold": {
    "zh-CN": "仅{已挂起}的发货单可解挂",
    "en-US": "Only the {hold} ShipmentNote can be unhold."
  },

  "hso.sn.message.errorConfig.confirmClose": {
    "zh-CN": "修改的信息未保存，是否确认关闭？",
    "en-US": "The modified information has not been saved. Are you sure to close?"
  },
  "hso.sn.message.errorConfig.confirmCancel": {
    "zh-CN": "修改的信息未保存，是否确认取消？",
    "en-US": "The modified information has not been saved. Are you sure to cancel?"
  },
  "hso.sn.message.errorInfo.onlyUnprocessedCanRetry": {
    "zh-CN": "仅可重试未处理的异常单据",
    "en-US": "Only the unprocessed exception can be retried."
  },
  "hso.sn.message.errorInfo.onlyManualCanRetry": {
    "zh-CN": "手动、仅手动的异常可重试",
    "en-US": "The manually and only-manual operation exception can be retried."
  },
  "hso.sn.message.errorInfo.retrySuccessfully": {
    "zh-CN": "重试成功",
    "en-US": "Retry Successfully"
  },
  "hso.sn.message.errorInfo.confirmClose": {
    "zh-CN": "确定要关闭吗？",
    "en-US": "Are you sure to close?"
  },
  "hso.sn.message.errorInfo.closeSuccessfully": {
    "zh-CN": "关闭成功",
    "en-US": "Close Successfully"
  }
}
`;

function bb() {
  console.log("b");

  let c = "M.Morning";
  let d = `M.Evening`;
  let e = "M.Evening";
}

const $t = (k: string) => {};

// 使用
const columns = [
  {
    title: $t("M.Morning"),
    width: 200,
  },
  {
    title: $t("M.Evening"),
    width: 200,
  },
];

const message = "warning";
