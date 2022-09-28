// This code was inspired by Dom's Tutorial
function DrawBarGraph(sampleId)
{
    console.log(`Draw Bar Graph: ${sampleId}`);
}

function DrawBubbleChart(sampleId)
{
    console.log(`Draw Bubble Chart: ${sampleId}`);
}

function ShowMetaData(sampleId)
{
    console.log(`Show Meta Data: ${sampleId}`);
}

function optionChanged(sampleId)
{
    console.log(`Option Changed: ${sampleId}`)
    DrawBarGraph(sampleId);
    DrawBubbleChart(sampleId);
    ShowMetaData(sampleId);
}

function InitDashboard(sampleId)
{
    let selector = d3.select("#selDataset");

    let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

    d3.json(url).then(data => {
        // console.log(data);

        let sampleNames = data.names;
        // console.log(sampleNames);

        for (let i = 0;i < sampleNames.length; i++){
            
            let sampleId = sampleNames[i];
            // console.log(sampleId);
            selector.append("option").text(sampleId).property("value", sampleId);
        };

        let intialId = selector.property("value");
        // console.log(intialId);

        DrawBarGraph(intialId);
        DrawBubbleChart(intialId);
        ShowMetaData(intialId);

    });
}

InitDashboard();