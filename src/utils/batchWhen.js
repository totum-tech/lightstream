import flyd from 'flyd';

export const batchWhen = (throttle$, source$) => {
  let batch = [];
  return flyd.combine((wait$, value$, self$, changed) => {
    if ( changed.indexOf(value$) > -1 ) batch.push(source$());
    if ( !wait$() && batch.length ) {
      self$(batch);
      batch = [];
    }
  }, [throttle$, source$]);
};
