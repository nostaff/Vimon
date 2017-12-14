<template>
    <vm-page v-nav="{title: 'Grid'}">

        <vm-content class="content-padded  grid-demos">

            <p padding="">
                Nine Soduku
            </p>
            <vm-grid no-padding class="nine" sudoku>
                <vm-row>
                    <vm-col class="box"></vm-col>
                    <vm-col class="box arrow">
                        <vm-icon name="arrow-dropup"></vm-icon>
                    </vm-col>
                    <vm-col class="box"></vm-col>
                </vm-row>
                <vm-row>
                    <vm-col class="box arrow">
                        <vm-icon name="arrow-dropleft"></vm-icon>
                    </vm-col>
                    <vm-col class="box arrow">
                        <vm-icon name="logo-javascript"></vm-icon>
                    </vm-col>
                    <vm-col class="box arrow">
                        <vm-icon name="arrow-dropright"></vm-icon>
                    </vm-col>
                </vm-row>
                <vm-row>
                    <vm-col class="box"></vm-col>
                    <vm-col class="box arrow">
                        <vm-icon name="arrow-dropdown"></vm-icon>
                    </vm-col>
                    <vm-col class="box"></vm-col>
                </vm-row>
            </vm-grid>

            <p padding>
                Equal-width columns
            </p>
            <vm-grid>
                <vm-row>
                    <vm-col>
                        <div class="col-demo">1 of 2</div>
                    </vm-col>
                    <vm-col>
                        <div class="col-demo">2 of 2</div>
                    </vm-col>
                </vm-row>
                <vm-row>
                    <vm-col>
                        <div class="col-demo">1 of 3</div>
                    </vm-col>
                    <vm-col>
                        <div class="col-demo">2 of 3</div>
                    </vm-col>
                    <vm-col>
                        <div class="col-demo">3 of 3</div>
                    </vm-col>
                </vm-row>
            </vm-grid>

            <p padding>
                Setting one column width
            </p>
            <vm-grid>
                <vm-row>
                    <vm-col>
                        <div class="col-demo">1 of 3</div>
                    </vm-col>
                    <vm-col col-6>
                        <div class="col-demo">2 of 3 (wider)</div>
                    </vm-col>
                    <vm-col>
                        <div class="col-demo">3 of 3</div>
                    </vm-col>
                </vm-row>
                <vm-row>
                    <vm-col col-6>
                        <div class="col-demo">1 of 3 (wider)</div>
                    </vm-col>
                    <vm-col>
                        <div class="col-demo">2 of 3</div>
                    </vm-col>
                    <vm-col>
                        <div class="col-demo">3 of 3</div>
                    </vm-col>
                </vm-row>
            </vm-grid>

            <p padding>
                Variable-width columns
            </p>
            <vm-grid>
                <vm-row>
                    <vm-col>
                        <div class="col-demo">1 of 3</div>
                    </vm-col>
                    <vm-col col-auto>
                        <div class="col-demo">Variable width content</div>
                    </vm-col>
                    <vm-col>
                        <div class="col-demo">3 of 3</div>
                    </vm-col>
                </vm-row>
                <vm-row>
                    <vm-col>
                        <div class="col-demo">1 of 4</div>
                    </vm-col>
                    <vm-col>
                        <div class="col-demo">2 of 4</div>
                    </vm-col>
                    <vm-col col-auto>
                        <div class="col-demo"><vm-icon name="globe" role="img" class="icon icon-ios ion-ios-globe" aria-label="globe"></vm-icon></div>
                    </vm-col>
                    <vm-col>
                        <div class="col-demo">4 of 4</div>
                    </vm-col>
                </vm-row>
            </vm-grid>

            <p padding>
                Offsetting columns
            </p>
            <vm-grid>
                <vm-row>
                    <vm-col>
                        <div class="col-demo">1 of 2</div>
                    </vm-col>
                    <vm-col offset-4>
                        <div class="col-demo">2 of 2</div>
                    </vm-col>
                </vm-row>

                <vm-row>
                    <vm-col offset-4>
                        <div class="col-demo">1 of 2</div>
                    </vm-col>
                    <vm-col>
                        <div class="col-demo">2 of 2</div>
                    </vm-col>
                </vm-row>
            </vm-grid>

            <p padding>
                Push and pull
            </p>
            <vm-grid>
                <vm-row>
                    <vm-col col-9 push-3>
                        <div class="col-demo">1 of 2</div>
                    </vm-col>
                    <vm-col col-3 pull-9>
                        <div class="col-demo">2 of 2</div>
                    </vm-col>
                </vm-row>

                <vm-row>
                    <vm-col col-6 push-3>
                        <div class="col-demo">1 of 3</div>
                    </vm-col>
                    <vm-col col-3 push-3>
                        <div class="col-demo">2 of 3</div>
                    </vm-col>
                    <vm-col col-3 pull-9>
                        <div class="col-demo">3 of 3</div>
                    </vm-col>
                </vm-row>
            </vm-grid>

            <p padding>
                Setting all column widths<br>
            </p>
            <vm-grid>
                <vm-row>
                    <vm-col col-4>
                        <div class="col-demo">1 of 3</div>
                    </vm-col>
                    <vm-col col-3>
                        <div class="col-demo">2 of 3</div>
                    </vm-col>
                    <vm-col col-5>
                        <div class="col-demo">3 of 3</div>
                    </vm-col>
                </vm-row>
            </vm-grid>

            <p padding>
                Vertical alignment
            </p>
            <vm-grid>
                <vm-row>
                    <vm-col>
                        <div class="col-demo">1 of 4</div>
                    </vm-col>
                    <vm-col>
                        <div class="col-demo">2 of 4 <br>#</div>
                    </vm-col>
                    <vm-col>
                        <div class="col-demo">3 of 4 <br>#<br>#</div>
                    </vm-col>
                    <vm-col>
                        <div class="col-demo">4 of 4 <br>#<br>#<br>#</div>
                    </vm-col>
                </vm-row>

                <vm-row align-items-start>
                    <vm-col>
                        <div class="col-demo">1 of 4</div>
                    </vm-col>
                    <vm-col>
                        <div class="col-demo">2 of 4</div>
                    </vm-col>
                    <vm-col>
                        <div class="col-demo">3 of 4</div>
                    </vm-col>
                    <vm-col>
                        <div class="col-demo">4 of 4 <br>#<br>#<br>#</div>
                    </vm-col>
                </vm-row>

                <vm-row align-items-center>
                    <vm-col>
                        <div class="col-demo">1 of 4</div>
                    </vm-col>
                    <vm-col>
                        <div class="col-demo">2 of 4</div>
                    </vm-col>
                    <vm-col>
                        <div class="col-demo">3 of 4</div>
                    </vm-col>
                    <vm-col>
                        <div class="col-demo">4 of 4 <br>#<br>#<br>#</div>
                    </vm-col>
                </vm-row>

                <vm-row align-items-end>
                    <vm-col>
                        <div class="col-demo">1 of 4</div>
                    </vm-col>
                    <vm-col>
                        <div class="col-demo">2 of 4</div>
                    </vm-col>
                    <vm-col>
                        <div class="col-demo">3 of 4</div>
                    </vm-col>
                    <vm-col>
                        <div class="col-demo">4 of 4 <br>#<br>#<br>#</div>
                    </vm-col>
                </vm-row>
            </vm-grid>

            <vm-grid>
                <vm-row>
                    <vm-col align-self-start>
                        <div class="col-demo">1 of 4</div>
                    </vm-col>
                    <vm-col align-self-center>
                        <div class="col-demo">2 of 4</div>
                    </vm-col>
                    <vm-col align-self-end>
                        <div class="col-demo">3 of 4</div>
                    </vm-col>
                    <vm-col>
                        <div class="col-demo">4 of 4 <br>#<br>#<br>#</div>
                    </vm-col>
                </vm-row>
            </vm-grid>

            <p padding>
                Horizontal Alignment
            </p>
            <vm-grid>
                <vm-row justify-content-start>
                    <vm-col col-3>
                        <div class="col-demo">1 of 2</div>
                    </vm-col>
                    <vm-col col-3>
                        <div class="col-demo">2 of 2</div>
                    </vm-col>
                </vm-row>

                <vm-row justify-content-center>
                    <vm-col col-3>
                        <div class="col-demo">1 of 2</div>
                    </vm-col>
                    <vm-col col-3>
                        <div class="col-demo">2 of 2</div>
                    </vm-col>
                </vm-row>

                <vm-row justify-content-end>
                    <vm-col col-3>
                        <div class="col-demo">1 of 2</div>
                    </vm-col>
                    <vm-col col-3>
                        <div class="col-demo">2 of 2</div>
                    </vm-col>
                </vm-row>

                <vm-row justify-content-around>
                    <vm-col col-3>
                        <div class="col-demo">1 of 2</div>
                    </vm-col>
                    <vm-col col-3>
                        <div class="col-demo">2 of 2</div>
                    </vm-col>
                </vm-row>

                <vm-row justify-content-between>
                    <vm-col col-3>
                        <div class="col-demo">1 of 2</div>
                    </vm-col>
                    <vm-col col-3>
                        <div class="col-demo">2 of 2</div>
                    </vm-col>
                </vm-row>
            </vm-grid>

        </vm-content>
    </vm-page>
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
