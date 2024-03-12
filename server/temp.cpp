#include <iostream>
#include <bits/stdc++.h>
using namespace std;

int lastStoneWeight(vector<int> weights)
{
    priority_queue<int> pq;
    for (int i = 0; i < weights.size(); i++)
    {
        pq.push(weights[i]);
    }
    int n = 10;
    while (pq.size() != 1 || pq.empty() == false)
    {
        int first = pq.top();
        pq.pop();

        int second = pq.top();
        pq.pop();

        if (first == second)
        {
            if (pq.empty())
                break;
            continue;
        } // equal w

        if (first > second)
        {
            pq.push(first - second);
            cout << " ans " << first - second;
        }
        else
        {
            pq.push(second - first);
            cout << " ans " << second - first;
        }
    }
    if (pq.empty() == true)
        return 0;

    return pq.top();
}
int main()
{
    vector<int> weights = {1, 2, 3, 6, 7, 7};
    cout << lastStoneWeight(weights);
    return 0;
}