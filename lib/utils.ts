export const throttleApi = (time, request) => {
  return (
    new Promise(function(resolve, reject){
        setTimeout(() => {
          resolve(request);
        }, time)
    })
  );
};