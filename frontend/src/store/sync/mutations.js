export function storeVisitors(state, visitors) 
{
    state.visitors = visitors.map(visitor => Object.assign({}, visitor, { syncing: false }));
}

export function setVisitorAsSyncing(state, visitor_id)
{
    let visitor = state.visitors.find(visitor => visitor.id === visitor_id);
    visitor.syncing = true;
}
export function storeLastRequestTime(state, lastRequestTime) 
{
    state.lastRequestTime = lastRequestTime.map(lastRequestTime => Object.assign({}, lastRequestTime, { syncing: false }));
}
export function storePassLogs(state, passLogs) 
{
    state.passLogs = passLogs.map(passLogs => Object.assign({}, passLogs, { syncing: false }));
}
export function storeGetLogsSwitch(state, getLogsSwitch) 
{
    state.getLogsSwitch = getLogsSwitch.map(getLogsSwitch => Object.assign({}, getLogsSwitch, { syncing: false }));
}