import process from "node:process";

export const STYLE = {
  greenBg: "\x1b[42m\x1b[30m\x1b[1m",
  greenText: "\x1b[32m",
  reset: "\x1b[0m"
};

export const silenceDotenv = () => {
  process.stdout.write('\x1bc'); 
  const originalLog = console.log;
  
  console.log = (...args) => {
    if (typeof args[0] === 'string' && (args[0].includes('dotenv') || args[0].includes('nodemon'))) {
      return;
    }
    originalLog(...args);
  };

  return () => {
    console.log = originalLog;
  };
};

export const logStatus = (type, port = "") => {
  if (type === 'server') {
    console.log(`🚀 ${STYLE.greenBg} INVENTORY ${STYLE.reset} start on http://localhost:${port}`);
  }
  if (type === 'mongo') {
    console.log(`🚀 success connect to ${STYLE.greenText}mongo${STYLE.reset}`);
  }
};