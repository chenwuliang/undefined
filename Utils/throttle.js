function throttle(fn, wait = 300) {
    let prev = +new Date();
    return function() {
      const args = argument,
        now = +new Date();
      if (now > prev + wait) {
        prev = now;
        fn.apply(this, args);
      }
    };
}