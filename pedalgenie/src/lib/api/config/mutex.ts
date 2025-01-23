class Mutex {
    private locked = false;
    private queue: Array<() => void> = [];
  
    lock() {
      return new Promise<void>((resolve) => {
        if (this.locked) {
          this.queue.push(resolve);
        } else {
          this.locked = true;
          resolve();
        }
      });
    }
  
    unlock() {
      if (this.queue.length > 0) {
        const nextResolve = this.queue.shift()!;
        nextResolve();
      } else {
        this.locked = false;
      }
    }
  }
  