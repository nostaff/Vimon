<template>
    <ion-page v-nav="{title: 'Grid'}">

        <ion-content class="content-padded  grid-demos">

            <p padding="">
                Nine Soduku
            </p>
            <ion-grid no-padding class="nine" sudoku>
                <ion-row>
                    <ion-col class="box"></ion-col>
                    <ion-col class="box arrow">
                        <icon name="arrow-dropup"></icon>
                    </ion-col>
                    <ion-col class="box"></ion-col>
                </ion-row>
                <ion-row>
                    <ion-col class="box arrow">
                        <ion-icon name="arrow-dropleft"></ion-icon>
                    </ion-col>
                    <ion-col class="box arrow">
                        <ion-icon name="logo-javascript"></ion-icon>
                    </ion-col>
                    <ion-col class="box arrow">
                        <ion-icon name="arrow-dropright"></ion-icon>
                    </ion-col>
                </ion-row>
                <ion-row>
                    <ion-col class="box"></ion-col>
                    <ion-col class="box arrow">
                        <ion-icon name="arrow-dropdown"></ion-icon>
                    </ion-col>
                    <ion-col class="box"></ion-col>
                </ion-row>
            </ion-grid>

            <p padding>
                Equal-width columns
            </p>
            <ion-grid>
                <ion-row>
                    <ion-col>
                        <div class="col-demo">1 of 2</div>
                    </ion-col>
                    <ion-col>
                        <div class="col-demo">2 of 2</div>
                    </ion-col>
                </ion-row>
                <ion-row>
                    <ion-col>
                        <div class="col-demo">1 of 3</div>
                    </ion-col>
                    <ion-col>
                        <div class="col-demo">2 of 3</div>
                    </ion-col>
                    <ion-col>
                        <div class="col-demo">3 of 3</div>
                    </ion-col>
                </ion-row>
            </ion-grid>

            <p padding>
                Setting one column width
            </p>
            <ion-grid>
                <ion-row>
                    <ion-col>
                        <div class="col-demo">1 of 3</div>
                    </ion-col>
                    <ion-col col-6>
                        <div class="col-demo">2 of 3 (wider)</div>
                    </ion-col>
                    <ion-col>
                        <div class="col-demo">3 of 3</div>
                    </ion-col>
                </ion-row>
                <ion-row>
                    <ion-col col-6>
                        <div class="col-demo">1 of 3 (wider)</div>
                    </ion-col>
                    <ion-col>
                        <div class="col-demo">2 of 3</div>
                    </ion-col>
                    <ion-col>
                        <div class="col-demo">3 of 3</div>
                    </ion-col>
                </ion-row>
            </ion-grid>

            <p padding>
                Variable-width columns
            </p>
            <ion-grid>
                <ion-row>
                    <ion-col>
                        <div class="col-demo">1 of 3</div>
                    </ion-col>
                    <ion-col col-auto>
                        <div class="col-demo">Variable width content</div>
                    </ion-col>
                    <ion-col>
                        <div class="col-demo">3 of 3</div>
                    </ion-col>
                </ion-row>
                <ion-row>
                    <ion-col>
                        <div class="col-demo">1 of 4</div>
                    </ion-col>
                    <ion-col>
                        <div class="col-demo">2 of 4</div>
                    </ion-col>
                    <ion-col col-auto>
                        <div class="col-demo"><ion-icon name="globe" role="img" class="icon icon-ios ion-ios-globe" aria-label="globe"></ion-icon></div>
                    </ion-col>
                    <ion-col>
                        <div class="col-demo">4 of 4</div>
                    </ion-col>
                </ion-row>
            </ion-grid>

            <p padding>
                Offsetting columns
            </p>
            <ion-grid>
                <ion-row>
                    <ion-col>
                        <div class="col-demo">1 of 2</div>
                    </ion-col>
                    <ion-col offset-4>
                        <div class="col-demo">2 of 2</div>
                    </ion-col>
                </ion-row>

                <ion-row>
                    <ion-col offset-4>
                        <div class="col-demo">1 of 2</div>
                    </ion-col>
                    <ion-col>
                        <div class="col-demo">2 of 2</div>
                    </ion-col>
                </ion-row>
            </ion-grid>

            <p padding>
                Push and pull
            </p>
            <ion-grid>
                <ion-row>
                    <ion-col col-9 push-3>
                        <div class="col-demo">1 of 2</div>
                    </ion-col>
                    <ion-col col-3 pull-9>
                        <div class="col-demo">2 of 2</div>
                    </ion-col>
                </ion-row>

                <ion-row>
                    <ion-col col-6 push-3>
                        <div class="col-demo">1 of 3</div>
                    </ion-col>
                    <ion-col col-3 push-3>
                        <div class="col-demo">2 of 3</div>
                    </ion-col>
                    <ion-col col-3 pull-9>
                        <div class="col-demo">3 of 3</div>
                    </ion-col>
                </ion-row>
            </ion-grid>

            <p padding>
                Setting all column widths<br>
            </p>
            <ion-grid>
                <ion-row>
                    <ion-col col-4>
                        <div class="col-demo">1 of 3</div>
                    </ion-col>
                    <ion-col col-3>
                        <div class="col-demo">2 of 3</div>
                    </ion-col>
                    <ion-col col-5>
                        <div class="col-demo">3 of 3</div>
                    </ion-col>
                </ion-row>
            </ion-grid>

            <p padding>
                Vertical alignment
            </p>
            <ion-grid>
                <ion-row>
                    <ion-col>
                        <div class="col-demo">1 of 4</div>
                    </ion-col>
                    <ion-col>
                        <div class="col-demo">2 of 4 <br>#</div>
                    </ion-col>
                    <ion-col>
                        <div class="col-demo">3 of 4 <br>#<br>#</div>
                    </ion-col>
                    <ion-col>
                        <div class="col-demo">4 of 4 <br>#<br>#<br>#</div>
                    </ion-col>
                </ion-row>

                <ion-row align-items-start>
                    <ion-col>
                        <div class="col-demo">1 of 4</div>
                    </ion-col>
                    <ion-col>
                        <div class="col-demo">2 of 4</div>
                    </ion-col>
                    <ion-col>
                        <div class="col-demo">3 of 4</div>
                    </ion-col>
                    <ion-col>
                        <div class="col-demo">4 of 4 <br>#<br>#<br>#</div>
                    </ion-col>
                </ion-row>

                <ion-row align-items-center>
                    <ion-col>
                        <div class="col-demo">1 of 4</div>
                    </ion-col>
                    <ion-col>
                        <div class="col-demo">2 of 4</div>
                    </ion-col>
                    <ion-col>
                        <div class="col-demo">3 of 4</div>
                    </ion-col>
                    <ion-col>
                        <div class="col-demo">4 of 4 <br>#<br>#<br>#</div>
                    </ion-col>
                </ion-row>

                <ion-row align-items-end>
                    <ion-col>
                        <div class="col-demo">1 of 4</div>
                    </ion-col>
                    <ion-col>
                        <div class="col-demo">2 of 4</div>
                    </ion-col>
                    <ion-col>
                        <div class="col-demo">3 of 4</div>
                    </ion-col>
                    <ion-col>
                        <div class="col-demo">4 of 4 <br>#<br>#<br>#</div>
                    </ion-col>
                </ion-row>
            </ion-grid>

            <ion-grid>
                <ion-row>
                    <ion-col align-self-start>
                        <div class="col-demo">1 of 4</div>
                    </ion-col>
                    <ion-col align-self-center>
                        <div class="col-demo">2 of 4</div>
                    </ion-col>
                    <ion-col align-self-end>
                        <div class="col-demo">3 of 4</div>
                    </ion-col>
                    <ion-col>
                        <div class="col-demo">4 of 4 <br>#<br>#<br>#</div>
                    </ion-col>
                </ion-row>
            </ion-grid>

            <p padding>
                Horizontal Alignment
            </p>
            <ion-grid>
                <ion-row justify-content-start>
                    <ion-col col-3>
                        <div class="col-demo">1 of 2</div>
                    </ion-col>
                    <ion-col col-3>
                        <div class="col-demo">2 of 2</div>
                    </ion-col>
                </ion-row>

                <ion-row justify-content-center>
                    <ion-col col-3>
                        <div class="col-demo">1 of 2</div>
                    </ion-col>
                    <ion-col col-3>
                        <div class="col-demo">2 of 2</div>
                    </ion-col>
                </ion-row>

                <ion-row justify-content-end>
                    <ion-col col-3>
                        <div class="col-demo">1 of 2</div>
                    </ion-col>
                    <ion-col col-3>
                        <div class="col-demo">2 of 2</div>
                    </ion-col>
                </ion-row>

                <ion-row justify-content-around>
                    <ion-col col-3>
                        <div class="col-demo">1 of 2</div>
                    </ion-col>
                    <ion-col col-3>
                        <div class="col-demo">2 of 2</div>
                    </ion-col>
                </ion-row>

                <ion-row justify-content-between>
                    <ion-col col-3>
                        <div class="col-demo">1 of 2</div>
                    </ion-col>
                    <ion-col col-3>
                        <div class="col-demo">2 of 2</div>
                    </ion-col>
                </ion-row>
            </ion-grid>

        </ion-content>
    </ion-page>
</template>

<style lang="scss">
    .grid-demos {
        .col-demo {
            padding: 5px;
            width: 100%;
            border: 1px solid #ddd;
            border-radius: 2px;
            background: #f7f7f7;
            text-align: center;
        }

        .demo {
            .grid, .row, .col {
                outline: 1px solid #a9a9a9;
            }
        }

        .box {
            height: 100px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 24px;
            &:active {
                background: #ddd;
            }
        }

        .nine {
            background: #fff;
        }
    }
</style>
