export function storeVisitors(state, visitors) 
{
    state.visitors = visitors.map(visitor => Object.assign({}, visitor, { syncing: false }));
}

export function setVisitorAsSyncing(state, visitor_id)
{
    let visitor = state.visitors.find(visitor => visitor.id === visitor_id);
    visitor.syncing = true;
}