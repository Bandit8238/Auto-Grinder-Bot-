const bot = {
  running: false,
  memory: {},

  log(msg) {
    const logBox = document.getElementById("log");
    logBox.innerHTML += msg + "<br>";
    logBox.scrollTop = logBox.scrollHeight;
  },

  start() {
    this.running = true;
    this.log("Bot started...");
    this.loop();
  },

  stop() {
    this.running = false;
    this.log("Bot stopped.");
  },

  loop() {
    if (!this.running) return;

    const state = this.readState();
    const action = this.decide(state);

    this.perform(action);
    this.learn(state, action);

    setTimeout(() => this.loop(), 200);
  },

  // 👀 "Vision"
  readState() {
    return {
      score: this.getScore(),
      obstacle: this.detectObstacle()
    };
  },

  getScore() {
    const el = document.querySelector("#score");
    return el ? parseInt(el.innerText) : 0;
  },

  detectObstacle() {
    return document.querySelector(".obstacle") !== null;
  },

  // 🧠 Decision making
  decide(state) {
    if (state.obstacle) return "jump";
    return "wait";
  },

  // 🎮 Actions
  perform(action) {
    if (action === "jump") {
      this.log("Jump!");
      this.simulateKey("Space");
    }
  },

  simulateKey(key) {
    document.dispatchEvent(
      new KeyboardEvent("keydown", { key })
    );
  },

  // 📈 Learning (VERY simple)
  learn(state, action) {
    const key = JSON.stringify(state);

    if (!this.memory[key]) {
      this.memory[key] = { success: 0, fail: 0 };
    }

    // fake reward system (you can improve this later)
    if (action === "jump" && !state.obstacle) {
      this.memory[key].fail++;
    } else {
      this.memory[key].success++;
    }

    this.log(`Learned: ${key}`);
  }
};
