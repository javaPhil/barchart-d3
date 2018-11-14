### Discoveries / Challenges / Lessons Learned

I always start projects like this off with some initial research on core concepts, and this being a Bar chart, I looked to the internet for some options on what to use. I looked into Material UI, Highcharts, Chartjs, and D3 and while they all have lots of pros and cons I ended up going with D3. D3's documentation isn't as robust as other libraries especially trying to implement it with React. There is a React-D3 component library that exists but after looking into it I found out that it was a half finished implementation. In the end, I went with vanilla D3 because my contact Arman informed me that Livestories uses it so I wanted to get familiar with what the team uses.

At Mighty AI we used Highcharts.js so this was my first real (other than tutorials and demos) project using D3 and it was somewhat challenging. I did some research on how React and D3 play together and it seems like the most common approach is to handle chart rendering and updating manually e.g. without React so that is what I went with here. I created an AnimatedBarChart component that handled most of the complexity with rendering the data and left the container component to handle the timer and passing new data down to the chart. It required managing props and nextProps explicitly during the componentWillReceiveProps() lifecycle method because if you mix those two up your chart will be out of sync with the data being passed in. I added some tests for coverage on some of the Redux actions/reducers and some testable helpers. Overall, other than a few bumps on the road I'm happy with this solution with the time I had available to work on it and I hope you like it as well.