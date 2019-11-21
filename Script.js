// Title:
//
// Grade Calculator
//
// Description
// A tool that calculates your current grade in a class and tells you what grade you need on the final exam to get a
// desired grade.
//
//     Basic Features:
// - A table with 5 sets of categories and weights. (Homework, Classwork, Tests, Participation, Projects)
// - “Calculate Current Grade” button calculates current grades using comma separated list of grades for each category
// (homework, up to 5 more) along with the category weights
// - “Calculate Final Exam Grade Needed” button takes the current grade, the final exam weight and a final grade desired
// data to calculate the grade needed on the final to receive the final grade desired.
// - Create dummy data that persists in your fields even on a page refresh
// - All user entry fields must be contained within a <table>
// - All elements must be centered on the page.  You can choose to center the elements within your table.
// - Use w3.css or bootstrap.css frameworks to style elements
// - The tool must fail gracefully if bad data is entered
//
// Advanced Features:
// - A single category to start and up to 6 categories are add-able by clicking an “Add” button and named via a name
// field.  (See example).
// - Color code the category rows based on the student grade in that category
// - Use relative positioning in css to space your elements out
// - Add validation so that if any grades over a certain threshold are entered, the user is alerted to the error
//
// Structure
// GLOBAL VARIABLES are not allowed in this project except for your colored row counter.
// calculateCurrentGrade() → takes data from page, calls on sub-functions to calculate the student grade and output it
// back to page.  Also “return” the result so that calculateGradeNeeded() can use it.
// addRow() Adds a new category/weight row (up to 6)
// convertArrayStringToNumber(string) → takes a string of comma separated values (from page) and returns it as an array
// of numbers.  Use string.split(“,”)  to convert a string into an array of strings, then iterate through and convert
//each item in the array into a number like:
//     array[i] = parseInt(array[i])
// averageArray() → takes an array of numbers and returns the average of those numbers
// calculateGradeNeeded() → takes the current grade returned by calculateCurrentGrade() and the grade desired and does
// the math to determine what the user needs on the final.

function calculateCurrentGrade(){
    //gets grades
    var homeworkScores = document.getElementById("hwGrade").value;
    var testScores = document.getElementById("testGrade").value;
    var quizScores = document.getElementById("qGrade").value;
    var classworkScores = document.getElementById("cwGrade").value;
    var participationScores = document.getElementById("partGrade").value;

    //turns grade strings into arrays
    var hwArr = arrayorize(homeworkScores);
    var tArr = arrayorize(testScores);
    var qArr = arrayorize(quizScores);
    var cwArr = arrayorize(classworkScores);
    var pArr = arrayorize(participationScores);

    //averages
    var avgHwGrd = avgCategories(hwArr);
    var avgTestGrd = avgCategories(tArr);
    var avgQuizGrd = avgCategories(qArr);
    var avgCwGrd = avgCategories(cwArr);
    var avgPartGrd = avgCategories(pArr);

    //gets weights
    var homeworkWeight = parseInt(document.getElementById("hwWeight").value) / 100;
    var testWeight = parseInt(document.getElementById("testWeight").value) / 100;
    var quizWeight = parseInt(document.getElementById("qWeight").value) / 100;
    var classworkWeight = parseInt(document.getElementById("cwWeight").value) / 100;
    var participationWeight = parseInt(document.getElementById("partWeight").value) / 100;

    //Finds actual grades
    var HwGrade = avgHwGrd * (homeworkWeight);
    var TestGrade = avgTestGrd * (testWeight);
    var QuizGrade = avgQuizGrd * (quizWeight);
    var CwGrade = avgCwGrd * (classworkWeight);
    var PartGrade = avgPartGrd * (participationWeight);

    var totalGrade = HwGrade + TestGrade + QuizGrade + CwGrade + PartGrade;

    var totalWeight = (homeworkWeight + testWeight + quizWeight + classworkWeight + participationWeight);

    var roundedGrade = totalGrade.toFixed(2);

    colorRowsByGrade("HwRow", avgHwGrd, "hwGrade");
    colorRowsByGrade("TestRow", avgTestGrd, "testGrade");
    colorRowsByGrade("QuizRow", avgQuizGrd, "qGrade");
    colorRowsByGrade("CwRow", avgCwGrd, "cwGrade");
    colorRowsByGrade("PartRow", avgPartGrd, "partGrade");

    //Puts it back into HTML
    if (totalGrade >= 0) {
        if (totalWeight !== 1) {
            document.getElementById("currentGrade").innerHTML = "I must request a formal apology, the weights that thou hast entered do not meet the requirements of adding up to 100%"
        } else {
            document.getElementById("currentGrade").innerHTML = "Thy grade is " + roundedGrade + "%";
        }
    } else {
        document.getElementById("currentGrade").innerHTML = "Thy grade is " + roundedGrade + "%, good luck on your final!";
    }

    return totalGrade;
}

function calculateFinalGrade(){
    var desiredGrade = parseInt(document.getElementById("gradeDesired").value);
    var finalWeight = parseInt(document.getElementById("finalWeight").value) / 100;
    var currentGrade = calculateCurrentGrade();

    var currGradeWt = currentGrade * (1 - finalWeight);

    var finalGrade = (-1 * (currGradeWt / finalWeight)) + (desiredGrade / finalWeight);
    if(finalGrade <= 100) {
        document.getElementById("finalGradeNeeded").innerHTML = "To receive a " + desiredGrade + "% in the class, thou shall want to score a " + finalGrade.toFixed(2) + "% towards the final";
    } else {
        document.getElementById("finalGradeNeeded").innerHTML = "To receive a " + desiredGrade + "% in the class, thou shall want to score a " + finalGrade.toFixed(2) + "% towards the final, best of luck!";
    }
}

//Turns strings into arrays
function arrayorize(string){
    var strArr = string.toString();
    var arr = strArr.split(", ");
    for (var i = 0; i < arr.length; i++){
        arr[i] = parseInt(arr[i]);
    }
    return arr;
}

//Averages arrays
function avgCategories(arr){
    var total = 0;
    for(var i = 0; i < arr.length; i++){
        total += arr[i];
    }
    var avg = total / arr.length;
    return avg;
}

//Colors the rows depending on the grade entered
function colorRowsByGrade(row, grade, gradeRow){
    if(grade >= 100){
        document.getElementById(row).style.backgroundColor = "darkgreen";
        document.getElementById(gradeRow).style.borderColor = "darkgreen";
    }
    if(grade >= 90 && grade < 100) {
        document.getElementById(row).style.backgroundColor = "green";
        document.getElementById(gradeRow).style.borderColor = "green";
    }
    if(grade >= 80 && grade < 90){
        document.getElementById(row).style.backgroundColor = "gold";
        document.getElementById(gradeRow).style.borderColor = "gold";
    }
    if(grade >= 70 && grade < 80){
        document.getElementById(row).style.backgroundColor = "darkorange";
        document.getElementById(gradeRow).style.borderColor = "darkorange";
    }
    if(grade >= 60 && grade < 70){
        document.getElementById(row).style.backgroundColor = "orangered";
        document.getElementById(gradeRow).style.borderColor = "orangered";
    }
    if(grade < 60){
        document.getElementById(row).style.backgroundColor = "red";
        document.getElementById(gradeRow).style.borderColor = "red";
    }
}