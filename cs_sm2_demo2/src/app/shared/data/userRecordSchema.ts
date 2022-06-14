export interface UserRecordData {
    userId: string;//this is the document id of user
    completeTime: string;//this is the date of the record completion
    questionid: string;//this is the id of the answered question
    q: number; //this is the quality response a score from 0 to 6
    EF: number;//easy factore
    n: number;//the number of repetition
}
/*
This text was taken from P.A.Wozniak, Optimization of learning, Master's Thesis, University of Technology in Poznan, 1990 and adapted for publishing as an independent article on the web. (P.A.Wozniak, May 10, 1998)

Algorithm SM-2 used in the computer-based variant of the SuperMemo method and involving the calculation of easiness factors for particular items:

Split the knowledge into smallest possible items.
With all items associate an E-Factor equal to 2.5.
Repeat items using the following intervals:
I(1):=1
I(2):=6
for n>2: I(n):=I(n-1)*EF
where:
I(n) - inter-repetition interval after the n-th repetition (in days),
EF - E-Factor of a given item
If interval is a fraction, round it up to the nearest integer.
After each repetition assess the quality of repetition response in 0-5 grade scale:
5 - perfect response
4 - correct response after a hesitation
3 - correct response recalled with serious difficulty
2 - incorrect response; where the correct one seemed easy to recall
1 - incorrect response; the correct one remembered
0 - complete blackout.
After each repetition modify the E-Factor of the recently repeated item according to the formula:
EF':=EF+(0.1-(5-q)*(0.08+(5-q)*0.02))
where:
EF' - new value of the E-Factor,
EF - old value of the E-Factor,
q - quality of the response in the 0-5 grade scale.
If EF is less than 1.3 then let EF be 1.3.
If the quality response was lower than 3 then start repetitions for the item from the beginning without changing the E-Factor (i.e. use intervals I(1), I(2) etc. as if the item was memorized anew).
After each repetition session of a given day repeat again all items that scored below four in the quality assessment. Continue the repetitions until all of these items score at least four.
*/