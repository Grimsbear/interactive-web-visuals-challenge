// This code was inspired by Dom's Tutorial
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

function DrawBarGraph(sampleId)
{
    console.log(`Draw Bar Graph: ${sampleId}`);

    d3.json(url).then(data => {
        // console.log(data);

        let samples = data.samples;
        let resultArray = samples.filter(s => s.id == sampleId);
        let result = resultArray[0];
        // console.log(result);

        let otu_ids = result.otu_ids;
        let otu_labels = result.otu_labels;
        let sample_values = result.sample_values;

        let yticks = otu_ids.slice(0,10).map(otuId => `OTU ${otuId}`)

        let barData = {
            x: sample_values.slice(0,10).reverse(),
            y: yticks,
            type: "bar",
            text: otu_labels.slice(0,10).reverse(),
            orientation: "h"
        };

        let barArray = [barData];

        let barLayout = {
            title: `Top 10 Bacteria for ${sampleId}`
        }

        Plotly.newPlot("bar", barArray, barLayout);
    });
}

function DrawBubbleChart(sampleId)
{
    console.log(`Draw Bubble Chart: ${sampleId}`);

    d3.json(url).then(data => {
        // console.log(data);

        let samples = data.samples;
        let resultArray = samples.filter(s => s.id == sampleId);
        let result = resultArray[0];
        console.log(result);

        let otu_ids = result.otu_ids;
        let otu_labels = result.otu_labels;
        let sample_values = result.sample_values;

        let bubbleData = {
            x: otu_ids,
            y: sample_values,
            type: "bubble",
            text: otu_labels,
            mode: "markers",
            markers: {
                size: sample_values,
                color: otu_ids
            }
        };

        let bubbleArray = [bubbleData];

        let bubbleLayout = {
            title: `Bacteria Cultures for ${sampleId}`,
            hovermode: "closest",
            xaxis: {title: "OTU ID"}
        }

        Plotly.newPlot("bubble", bubbleArray, bubbleLayout);
    });
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