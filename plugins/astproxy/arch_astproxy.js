/**
 * The architect component that exposes _astproxy_ module.
 *
 * @class arch_astproxy
 */
var astProxy = require('./astproxy');
var queueRecallingManager = require('./queue_recalling_manager');

/**
 * The module identifier used by the logger.
 *
 * @property IDLOG
 * @type string
 * @private
 * @final
 * @readOnly
 * @default [arch_astproxy]
 */
var IDLOG = '[arch_astproxy]';

module.exports = function(options, imports, register) {

  var logger = console;
  if (imports.logger) {
    logger = imports.logger;
  }
  // public interface for other architect components
  register(null, {
    astProxy: {
      reload: astProxy.reload,
      on: astProxy.on,
      doCmd: astProxy.doCmd,
      setCfb: astProxy.proxyLogic.setCfb,
      setCfu: astProxy.proxyLogic.setCfu,
      getAlarms: astProxy.proxyLogic.getAlarms,
      getSipWebrtcConf: astProxy.getSipWebrtcConf,
      createAlarm: astProxy.proxyLogic.createAlarm,
      opWaitConv: astProxy.proxyLogic.opWaitConv,
      deleteAlarm: astProxy.proxyLogic.deleteAlarm,
      getConference: astProxy.proxyLogic.getConference,
      pickupQueueWaitingCaller: astProxy.proxyLogic.pickupQueueWaitingCaller,
      getEchoCallDestination: astProxy.proxyLogic.getEchoCallDestination,
      getMeetmeConfCode: astProxy.proxyLogic.getMeetmeConfCode,
      isPinEnabledAtLeastOneRoute: astProxy.proxyLogic.isPinEnabledAtLeastOneRoute,
      getUserExtenIdFromConf: astProxy.proxyLogic.getUserExtenIdFromConf,
      unmuteUserMeetmeConf: astProxy.proxyLogic.unmuteUserMeetmeConf,
      hangupUserMeetmeConf: astProxy.proxyLogic.hangupUserMeetmeConf,
      endMeetmeConf: astProxy.proxyLogic.endMeetmeConf,
      setExtensionUsername: astProxy.proxyLogic.setExtensionUsername,
      getUsernameByExtension: astProxy.proxyLogic.getUsernameByExtension,
      muteUserMeetmeConf: astProxy.proxyLogic.muteUserMeetmeConf,
      isExtenInMeetmeConf: astProxy.proxyLogic.isExtenInMeetmeConf,
      setUnconditionalCfVm: astProxy.proxyLogic.setUnconditionalCfVm,
      setCfbVm: astProxy.proxyLogic.setCfbVm,
      setCfuVm: astProxy.proxyLogic.setCfuVm,
      startMeetmeConference: astProxy.proxyLogic.startMeetmeConference,
      setUnconditionalCf: astProxy.proxyLogic.setUnconditionalCf,
      getExtensions: astProxy.proxyLogic.getExtensions,
      getExtensionAgent: astProxy.proxyLogic.getExtensionAgent,
      getExtensionIp: astProxy.proxyLogic.getExtensionIp,
      getPrefix: astProxy.proxyLogic.getPrefix,
      addPrefix: astProxy.proxyLogic.addPrefix,
      isTrunk: astProxy.proxyLogic.isTrunk,
      isExten: astProxy.proxyLogic.isExten,
      hangupChannel: astProxy.proxyLogic.hangupChannel,
      hangupConversation: astProxy.proxyLogic.hangupConversation,
      hangupMainExtension: astProxy.proxyLogic.hangupMainExtension,
      forceHangupConversation: astProxy.proxyLogic.forceHangupConversation,
      startRecordConversation: astProxy.proxyLogic.startRecordConversation,
      stopRecordConversation: astProxy.proxyLogic.stopRecordConversation,
      muteRecordConversation: astProxy.proxyLogic.muteRecordConversation,
      unmuteRecordConversation: astProxy.proxyLogic.unmuteRecordConversation,
      parkConversation: astProxy.proxyLogic.parkConversation,
      redirectConversation: astProxy.proxyLogic.redirectConversation,
      redirectWaitingCaller: astProxy.proxyLogic.redirectWaitingCaller,
      redirectParking: astProxy.proxyLogic.redirectParking,
      attendedTransferConversation: astProxy.proxyLogic.attendedTransferConversation,
      blindTransferConversation: astProxy.proxyLogic.blindTransferConversation,
      transferConversationToVoicemail: astProxy.proxyLogic.transferConversationToVoicemail,
      call: astProxy.proxyLogic.call,
      muteConversation: astProxy.proxyLogic.muteConversation,
      unmuteConversation: astProxy.proxyLogic.unmuteConversation,
      sendDtmfToConversation: astProxy.proxyLogic.sendDtmfToConversation,
      pickupConversation: astProxy.proxyLogic.pickupConversation,
      pickupParking: astProxy.proxyLogic.pickupParking,
      inoutDynQueues: astProxy.proxyLogic.inoutDynQueues,
      getQCallsStatsHist: astProxy.proxyLogic.getQCallsStatsHist,
      queueMemberPauseUnpause: astProxy.proxyLogic.queueMemberPauseUnpause,
      queueMemberAdd: astProxy.proxyLogic.queueMemberAdd,
      queueMemberRemove: astProxy.proxyLogic.queueMemberRemove,
      startSpyListenConversation: astProxy.proxyLogic.startSpyListenConversation,
      startSpySpeakConversation: astProxy.proxyLogic.startSpySpeakConversation,
      getJSONExtension: astProxy.proxyLogic.getJSONExtension,
      getJSONExtensions: astProxy.proxyLogic.getJSONExtensions,
      getJSONQueues: astProxy.proxyLogic.getJSONQueues,
      getJSONAllQueuesStats: astProxy.proxyLogic.getJSONAllQueuesStats,
      getJSONAllAgentsStats: astProxy.proxyLogic.getJSONAllAgentsStats,
      evtConversationHold: astProxy.proxyLogic.evtConversationHold,
      evtConversationUnhold: astProxy.proxyLogic.evtConversationUnhold,
      getPinExtens: astProxy.proxyLogic.getPinExtens,
      setPinExten: astProxy.proxyLogic.setPinExten,
      getQMAlarmsNotificationsStatus: astProxy.proxyLogic.getQMAlarmsNotificationsStatus,
      setQMAlarmsNotificationsStatus: astProxy.proxyLogic.setQMAlarmsNotificationsStatus,
      getJSONQueueStats: astProxy.proxyLogic.getJSONQueueStats,
      getJSONTrunks: astProxy.proxyLogic.getJSONTrunks,
      getTrunksList: astProxy.proxyLogic.getTrunksList,
      getExtensList: astProxy.proxyLogic.getExtensList,
      getQueuesList: astProxy.proxyLogic.getQueuesList,
      getJSONParkings: astProxy.proxyLogic.getJSONParkings,
      sendDTMFSequence: astProxy.proxyLogic.sendDTMFSequence,
      getExtensionsFromConversation: astProxy.proxyLogic.getExtensionsFromConversation,
      getBaseCallRecAudioPath: astProxy.proxyLogic.getBaseCallRecAudioPath,
      getQueueIdsOfExten: astProxy.proxyLogic.getQueueIdsOfExten,
      recordAudioFile: astProxy.proxyLogic.recordAudioFile,
      isExtenDynMemberQueue: astProxy.proxyLogic.isExtenDynMemberQueue,
      isDynMemberLoggedInQueue: astProxy.proxyLogic.isDynMemberLoggedInQueue,
      CF_TYPES: require('./proxy_logic_13/util_call_forward_13').CF_TYPES,
      EVT_EXTEN_CHANGED: astProxy.proxyLogic.EVT_EXTEN_CHANGED,
      EVT_EXTEN_HANGUP: astProxy.proxyLogic.EVT_EXTEN_HANGUP,
      EVT_NEW_CDR: astProxy.proxyLogic.EVT_NEW_CDR,
      EVT_READY: astProxy.proxyLogic.EVT_READY,
      EVT_RELOADED: astProxy.proxyLogic.EVT_RELOADED,
      EVT_QUEUE_MEMBER_CHANGED: astProxy.proxyLogic.EVT_QUEUE_MEMBER_CHANGED,
      EVT_MEETME_CONF_END: astProxy.proxyLogic.EVT_MEETME_CONF_END,
      EVT_MEETME_CONF_CHANGED: astProxy.proxyLogic.EVT_MEETME_CONF_CHANGED,
      EVT_TRUNK_CHANGED: astProxy.proxyLogic.EVT_TRUNK_CHANGED,
      EVT_EXTEN_DIALING: astProxy.proxyLogic.EVT_EXTEN_DIALING,
      EVT_EXTEN_CONNECTED: astProxy.proxyLogic.EVT_EXTEN_CONNECTED,
      EVT_QUEUE_CHANGED: astProxy.proxyLogic.EVT_QUEUE_CHANGED,
      EVT_PARKING_CHANGED: astProxy.proxyLogic.EVT_PARKING_CHANGED,
      EVT_NEW_VOICE_MESSAGE: astProxy.proxyLogic.EVT_NEW_VOICE_MESSAGE,
      EVT_UPDATE_VOICE_MESSAGES: astProxy.proxyLogic.EVT_UPDATE_VOICE_MESSAGES,
      EVT_EXTEN_DND_CHANGED: astProxy.proxyLogic.EVT_EXTEN_DND_CHANGED,
      EVT_EXTEN_CF_CHANGED: astProxy.proxyLogic.EVT_EXTEN_CF_CHANGED,
      EVT_EXTEN_CFB_CHANGED: astProxy.proxyLogic.EVT_EXTEN_CFB_CHANGED,
      EVT_EXTEN_CFU_CHANGED: astProxy.proxyLogic.EVT_EXTEN_CFU_CHANGED,
      EVT_EXTEN_CFVM_CHANGED: astProxy.proxyLogic.EVT_EXTEN_CFVM_CHANGED,
      setAsteriskPresence: astProxy.proxyLogic.setAsteriskPresence,
      getExtenCfValue: astProxy.proxyLogic.getExtenCfValue,
      getExtenCfbValue: astProxy.proxyLogic.getExtenCfbValue,
      getExtenCfuValue: astProxy.proxyLogic.getExtenCfuValue,
      isExtenCf: astProxy.proxyLogic.isExtenCf,
      isExtenCfb: astProxy.proxyLogic.isExtenCfb,
      isExtenCfu: astProxy.proxyLogic.isExtenCfu,
      isExtenCfVm: astProxy.proxyLogic.isExtenCfVm,
      isExtenCfbVm: astProxy.proxyLogic.isExtenCfbVm,
      isExtenCfuVm: astProxy.proxyLogic.isExtenCfuVm,
      getExtenFromMac: astProxy.proxyLogic.getExtenFromMac,
      setDnd: astProxy.proxyLogic.setDnd,
      isExtenDnd: astProxy.proxyLogic.isExtenDnd,
      isAutoC2CEnabled: astProxy.proxyLogic.isAutoC2CEnabled,
      getRecallData: queueRecallingManager.getRecallData,
      getQueueRecallInfo: queueRecallingManager.getQueueRecallInfo,
      checkQueueRecallingStatus: queueRecallingManager.checkQueueRecallingStatus
    }
  });

  try {
    // imports.dbconn.on(imports.dbconn.EVT_READY, function () {
    astProxy.setLogger(logger.ctilog);
    astProxy.config('/etc/nethcti/asterisk.json');
    astProxy.configAstObjects('/etc/nethcti/ast_objects.json');
    astProxy.configExtens('/etc/nethcti/users.json');
    // astProxy.configRemoteSitesPrefixes('/etc/nethcti/remote_sites.json');
    // astProxy.configSipWebrtc('/etc/nethcti/sip_webrtc.json');
    astProxy.proxyLogic.setCompDbconn(imports.dbconn);
    // astProxy.proxyLogic.setCompPhonebook(imports.phonebook);
    // astProxy.proxyLogic.setCompCallerNote(imports.callerNote);
    astProxy.start();
    queueRecallingManager.setLogger(logger.ctilog);
    queueRecallingManager.setCompAstProxy(astProxy);
    queueRecallingManager.setCompDbconn(imports.dbconn);
    // });
  } catch (err) {
    logger.ctilog.log.error(err.stack);
  }
};
