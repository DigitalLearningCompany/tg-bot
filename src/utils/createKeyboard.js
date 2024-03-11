const createKeyboard = (buttonConfig) => {
  const keyboard = {
    inline_keyboard: buttonConfig.map(
      ({ text, callback_data = null, url = null }) => [
        {
          text,
          callback_data,
          url,
        },
      ]
    ),
  };
  return keyboard;
};

module.exports = { createKeyboard };
