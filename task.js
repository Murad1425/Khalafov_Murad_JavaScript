const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// --- Task 1: Input processing ---
function processInputs(number, name, array) {
  console.log("\n--- Task 1: Processing Inputs ---");

  // Check number > 7
  if (number > 7) {
    console.log("Hello");
  }

  // Check name
  if (name === "John") {
    console.log("Hello, John");
  } else {
    console.log("There is no such name");
  }

  // Multiples of 3
  const multiplesOfThree = array.filter(n => n % 3 === 0);
  console.log("Multiples of 3 in the array:", multiplesOfThree);
}

// --- Task 2: Bracket validation ---
function validateBrackets(sequence) {
  const stack = [];
  const map = { '(': ')', '[': ']', '{': '}' };

  for (let char of sequence) {
    if (map[char]) {
      stack.push(char);
    } else if (Object.values(map).includes(char)) {
      const last = stack.pop();
      if (map[last] !== char) {
        return false;
      }
    }
  }

  return stack.length === 0;
}

// --- CLI Program Start ---
function startProgram() {
  console.log("\n=== QA Automation Task ===");
  console.log("1️⃣  Process Inputs (Number, Name, Array)");
  console.log("2️⃣  Validate Bracket Sequence\n");

  rl.question("Choose a task (1 or 2): ", choice => {
    if (choice === "1") {
      rl.question("Enter a number: ", numInput => {
        const number = parseFloat(numInput);

        rl.question("Enter a name: ", name => {
          rl.question("Enter an array (comma-separated): ", arrayInput => {
            const array = arrayInput.split(',').map(val => parseInt(val.trim()));

            processInputs(number, name, array);
            askToRunAgain();
          });
        });
      });

    } else if (choice === "2") {
      rl.question("Enter a bracket sequence (or press Enter for default): ", input => {
        const sequence = input || "[((()))()(())]]";

        console.log("\n--- Task 2: Bracket Validation ---");
        console.log("Sequence:", sequence);

        const valid = validateBrackets(sequence);
        console.log("Is the sequence valid?", valid ? "✅ Yes" : "❌ No");

        if (!valid && sequence === "[((()))()(())]]") {
          console.log("Suggestion: Remove the extra ']' at the end or add a matching '[' at the start.");
        }

        askToRunAgain();
      });

    } else {
      console.log("❌ Invalid choice.");
      rl.close();
    }
  });
}

// --- Ask to restart ---
function askToRunAgain() {
  rl.question("\nWould you like to run again? (yes/no): ", answer => {
    if (answer.toLowerCase() === "yes") {
      startProgram();
    } else {
      console.log("👋 Goodbye! Thank you for using the app.");
      rl.close();
    }
  });
}

// --- Run the app ---
startProgram();
